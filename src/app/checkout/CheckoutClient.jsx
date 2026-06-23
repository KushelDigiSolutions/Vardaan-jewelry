"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { LuShieldCheck } from "react-icons/lu";
import { FiCheck, FiMapPin, FiPlus, FiChevronLeft, FiCreditCard } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CheckoutClient() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { user, token, addresses, addAddress, authLoading } = useAuth();

  // Wizard Stage: 1 (Address Selection) | 2 (Promo & Payment Choice) | 3 (Simulated Gateway) | 4 (Success / AWB Details)
  const [step, setStep] = useState(1);

  // Address states
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: "Home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  // Shipping & Coupon states
  const [shippingMethod, setShippingMethod] = useState("Standard Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount }
  const [couponError, setCouponError] = useState("");

  // Process / Result states
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mockGatewayTimer, setMockGatewayTimer] = useState(3);

  // Pre-select default address if available
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddr = addresses.find(a => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr._id);
      } else {
        setSelectedAddressId(addresses[0]._id);
      }
    }
  }, [addresses]);

  const handleAddrChange = (e) => {
    setNewAddr({ ...newAddr, [e.target.name]: e.target.value });
  };

  // Add a new address inline
  const handleAddNewAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const updatedList = await addAddress(newAddr);
      // Select the newly added address (usually the last one or default)
      if (updatedList && updatedList.length > 0) {
        const newlyAdded = updatedList[updatedList.length - 1];
        setSelectedAddressId(newlyAdded._id);
      }
      setIsAddingNewAddress(false);
      setNewAddr({ title: "Home", street: "", city: "", state: "", zipCode: "", country: "India" });
    } catch (err) {
      setErrorMsg(err.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Apply Coupon code
  const handleApplyCoupon = async () => {
    setCouponError("");
    if (!couponInput.trim()) return;
    try {
      const res = await fetch(`${API_URL}/coupons/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim(), orderAmount: subtotal })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Coupon invalid");
      }
      setAppliedCoupon({
        code: json.data.code,
        discount: json.data.discount
      });
    } catch (err) {
      setCouponError(err.message || "Coupon is invalid");
      setAppliedCoupon(null);
    }
  };

  // Compute Shipping Fees
  const shippingCost = shippingMethod === "Express Delivery" ? 150 : (subtotal < 999 ? 50 : 0);
  
  // Compute Grand Total
  const discountVal = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal - discountVal + shippingCost);

  // Submit Order Checkout
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setErrorMsg("Please select or add a delivery address.");
      return;
    }
    const addressDetails = addresses.find(a => a._id === selectedAddressId);
    if (!addressDetails) {
      setErrorMsg("Selected address details are invalid.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          shippingAddress: {
            street: addressDetails.street,
            city: addressDetails.city,
            state: addressDetails.state,
            zipCode: addressDetails.zipCode,
            country: addressDetails.country
          },
          shippingMethod,
          paymentMethod,
          couponCode: appliedCoupon ? appliedCoupon.code : undefined
        })
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Checkout failed");
      }

      const order = json.data;
      setOrderData(order);

      // Route depending on payment choice
      if (paymentMethod === "COD") {
        // Direct Success
        setStep(4);
        clearCart();
      } else {
        // Run Simulated Gateway Screen
        setStep(3);
        startMockGatewayCountdown(order._id);
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Mock Gateway Countdown & Verify
  const startMockGatewayCountdown = (orderId) => {
    let count = 3;
    setMockGatewayTimer(count);
    const interval = setInterval(async () => {
      count -= 1;
      setMockGatewayTimer(count);
      if (count <= 0) {
        clearInterval(interval);
        // Call Payment Verify API
        try {
          const res = await fetch(`${API_URL}/payments/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              orderId,
              gatewayTransactionId: `txn_mock_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
              status: "success"
            })
          });
          const json = await res.json();
          if (res.ok) {
            setOrderData(json.data); // Update with verified order + AWB
            setStep(4);
            clearCart();
          } else {
            setErrorMsg("Simulated payment verification failed.");
            setStep(2);
          }
        } catch (e) {
          console.error(e);
          setErrorMsg("Failed to verify transaction.");
          setStep(2);
        }
      }
    }, 1000);
  };

  if (authLoading) {
    return (
      <div className="w-full text-center py-20 bg-[#fdfbf6] font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
        <p className="text-gray-500">Checking session details...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <section className="flex-1 flex justify-center py-20 px-5 bg-[#fdfbf6]">
        <div className="bg-white border border-[#F0ECE3] rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <h3 className="text-2xl font-serif text-[#07512E] mb-3">Authentication Required</h3>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-6">
            You must sign in to save shipping addresses and place orders securely.
          </p>
          <Link
            href={`/login?redirect=/checkout`}
            className="inline-block bg-[#07512E] text-[#FFDE59] px-8 py-3 rounded font-sans font-semibold hover:bg-[#054024] transition-colors"
          >
            SIGN IN TO PROCEED
          </Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0 && step !== 4) {
    return (
      <section className="flex-1 flex justify-center py-20 px-5 bg-[#fdfbf6]">
        <div className="bg-white border border-[#F0ECE3] rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <h3 className="text-2xl font-serif text-[#07512E] mb-3">Your cart is empty</h3>
          <p className="text-sm text-gray-500 font-sans mb-6">
            Add items to your bag before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#07512E] text-white px-8 py-3 rounded font-sans font-semibold hover:bg-[#054024] transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex justify-center py-10 px-5 bg-[#fdfbf6] text-left">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Wizard Forms */}
        <div className="flex-[2] bg-white p-6 sm:p-8 rounded-lg shadow-sm w-full border border-[#F0ECE3]">
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded">
              {errorMsg}
            </div>
          )}

          {/* Wizard step Indicators */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-150 font-sans text-xs sm:text-sm text-gray-400 font-medium">
            <span className={step === 1 ? "text-[#07512E] font-bold" : step > 1 ? "text-gray-900" : ""}>1. Delivery Address</span>
            <span className="text-gray-300">→</span>
            <span className={step === 2 ? "text-[#07512E] font-bold" : step > 2 ? "text-gray-900" : ""}>2. Payment & Promos</span>
            <span className="text-gray-300">→</span>
            <span className={step === 3 ? "text-[#07512E] font-bold" : ""}>3. Payment Capture</span>
            <span className="text-gray-300">→</span>
            <span className={step === 4 ? "text-green-700 font-bold" : ""}>4. Confirmation</span>
          </div>

          {/* STEP 1: Address Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-serif text-[#07512E] mb-6 font-normal">Select Shipping Address</h3>
              
              {!isAddingNewAddress ? (
                <div className="flex flex-col gap-4">
                  {addresses && addresses.length > 0 ? (
                    addresses.map((addr) => (
                      <label 
                        key={addr._id} 
                        className={`flex items-start gap-4 p-4 border rounded cursor-pointer transition-all ${
                          selectedAddressId === addr._id ? "border-[#07512E] bg-green-50/20" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="addressRadio" 
                          checked={selectedAddressId === addr._id}
                          onChange={() => setSelectedAddressId(addr._id)}
                          className="mt-1 accent-[#07512E]"
                        />
                        <div className="text-sm font-sans text-gray-700 leading-normal">
                          <p className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                            <FiMapPin className="text-[#07512E]" />
                            {addr.title} {addr.isDefault && <span className="text-[10px] bg-[#07512E] text-white px-2 py-0.5 rounded font-normal font-sans">DEFAULT</span>}
                          </p>
                          <p>{addr.street}</p>
                          <p>{addr.city}, {addr.state} - {addr.zipCode}</p>
                          <p>{addr.country}</p>
                        </div>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 font-sans italic mb-4">No shipping addresses on file. Please add one below.</p>
                  )}

                  <button
                    onClick={() => setIsAddingNewAddress(true)}
                    className="flex items-center gap-2 border border-dashed border-[#07512E] text-[#07512E] py-4 rounded justify-center font-sans font-semibold text-sm hover:bg-green-50/10 transition-colors cursor-pointer"
                  >
                    <FiPlus /> ADD NEW SHIPPING ADDRESS
                  </button>

                  <div className="flex justify-between border-t border-gray-100 pt-6 mt-6">
                    <Link href="/cart" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-semibold font-sans">
                      <FiChevronLeft /> Back to Cart
                    </Link>
                    <button
                      onClick={() => {
                        if (!selectedAddressId) {
                          setErrorMsg("Please select or save a delivery address first.");
                          return;
                        }
                        setStep(2);
                        setErrorMsg("");
                      }}
                      className="bg-[#07512E] text-white px-8 py-3 rounded font-sans font-semibold text-sm hover:bg-[#054024] cursor-pointer"
                    >
                      CONTINUE TO PAYMENT
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAddNewAddressSubmit} className="flex flex-col gap-4 font-sans text-sm max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1.5">Address Label</label>
                      <input type="text" name="title" required value={newAddr.title} onChange={handleAddrChange} className="w-full p-2.5 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E]" placeholder="e.g. Home, Office" />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1.5">Zip/Postal Code</label>
                      <input type="text" name="zipCode" required value={newAddr.zipCode} onChange={handleAddrChange} className="w-full p-2.5 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E]" placeholder="110001" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1.5">Street Address</label>
                    <input type="text" name="street" required value={newAddr.street} onChange={handleAddrChange} className="w-full p-2.5 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E]" placeholder="Flat / House No, Street name" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1.5">City</label>
                      <input type="text" name="city" required value={newAddr.city} onChange={handleAddrChange} className="w-full p-2.5 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E]" placeholder="New Delhi" />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1.5">State</label>
                      <input type="text" name="state" required value={newAddr.state} onChange={handleAddrChange} className="w-full p-2.5 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E]" placeholder="Delhi" />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded font-sans font-semibold"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#07512E] text-white px-6 py-2.5 rounded font-sans font-semibold hover:bg-[#054024]"
                    >
                      {loading ? "SAVING..." : "SAVE ADDRESS"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* STEP 2: Coupons & Payment Choice */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-serif text-[#07512E] mb-6 font-normal">Payment & Promo Codes</h3>
              
              {/* Shipping Method Selector */}
              <div className="mb-8 font-sans">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Select Shipping Method</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`flex justify-between items-center p-4 border rounded cursor-pointer ${shippingMethod === "Standard Delivery" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" checked={shippingMethod === "Standard Delivery"} onChange={() => setShippingMethod("Standard Delivery")} className="accent-[#07512E]" />
                      <div>
                        <p className="font-bold text-gray-900">Standard Shipping</p>
                        <p className="text-xs text-gray-500">3 - 6 business days</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#2e8b57]">Free</span>
                  </label>
                  
                  <label className={`flex justify-between items-center p-4 border rounded cursor-pointer ${shippingMethod === "Express Delivery" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" checked={shippingMethod === "Express Delivery"} onChange={() => setShippingMethod("Express Delivery")} className="accent-[#07512E]" />
                      <div>
                        <p className="font-bold text-gray-900">Express Shipping</p>
                        <p className="text-xs text-gray-500">1 - 2 business days</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">₹ 150.00</span>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8 font-sans">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Select Payment Gateway</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className={`flex flex-col p-4 border rounded cursor-pointer gap-2 ${paymentMethod === "Razorpay" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <input type="radio" checked={paymentMethod === "Razorpay"} onChange={() => setPaymentMethod("Razorpay")} className="accent-[#07512E] self-start" />
                    <div>
                      <p className="font-bold text-gray-900">Razorpay / UPI</p>
                      <p className="text-xs text-gray-500">Simulate UPI/Gateway</p>
                    </div>
                  </label>

                  <label className={`flex flex-col p-4 border rounded cursor-pointer gap-2 ${paymentMethod === "Card" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <input type="radio" checked={paymentMethod === "Card"} onChange={() => setPaymentMethod("Card")} className="accent-[#07512E] self-start" />
                    <div>
                      <p className="font-bold text-gray-900">Credit / Debit Card</p>
                      <p className="text-xs text-gray-500">Simulate Visa/Mastercard</p>
                    </div>
                  </label>
                  
                  <label className={`flex flex-col p-4 border rounded cursor-pointer gap-2 ${paymentMethod === "COD" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} className="accent-[#07512E] self-start" />
                    <div>
                      <p className="font-bold text-gray-900">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay on parcel arrival</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Back & Place Buttons */}
              <div className="flex justify-between border-t border-gray-100 pt-6 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-semibold font-sans bg-transparent border-none cursor-pointer"
                >
                  <FiChevronLeft /> Back to Address Selection
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="bg-[#07512E] text-white px-8 py-3 rounded font-sans font-semibold text-sm hover:bg-[#054024] cursor-pointer flex items-center justify-center"
                >
                  {loading ? "PROCESSING ORDER..." : "PLACE ORDER & CHECKOUT"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Simulated Gateway Spinner */}
          {step === 3 && (
            <div className="text-center py-16 animate-fade-in font-sans">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-[#07512E] animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simulated Secure Gateway</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                Contacting payment channel... Verifying and capturing credentials. Please do not close or reload this page.
              </p>
              <div className="mt-8 text-[#07512E] text-lg font-bold flex items-center justify-center gap-2">
                <FiCreditCard /> Verifying in {mockPaymentLoading || mockGatewayTimer} seconds...
              </div>
            </div>
          )}

          {/* STEP 4: Success Details */}
          {step === 4 && orderData && (
            <div className="text-center py-8 animate-fade-in font-sans">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4 border border-green-200">
                <FiCheck className="w-8 h-8 stroke-[3]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#07512E] mb-2 font-normal">Order Confirmed</h2>
              <p className="text-gray-500 text-[15px] mb-8 max-w-md mx-auto">
                Thank you for shopping with Vardaan! We have captured your order details. A confirmation invoice email is being dispatched.
              </p>

              {/* Order summary stats block */}
              <div className="bg-[#FAF9F6] border border-[#F0ECE3] rounded p-6 max-w-lg mx-auto mb-8 text-left text-sm text-gray-700">
                <p className="mb-2"><b>Order Identifier:</b> <span className="font-mono text-xs">#{orderData._id}</span></p>
                <p className="mb-2"><b>Fulfillment Stage:</b> <span className="badge badge-success capitalize inline-block px-2.5 py-0.5 rounded text-[11px] font-bold text-white bg-green-700">{orderData.orderStatus}</span></p>
                <p className="mb-2"><b>Payment status:</b> <span className="font-semibold">{orderData.paymentStatus}</span></p>
                <p className="mb-2"><b>Carrier Partner:</b> {orderData.tracking?.carrier || "Shipment pending allocation"}</p>
                <p className="mb-2"><b>AWB Code:</b> <span className="font-mono">{orderData.tracking?.awb || "Pending generation"}</span></p>
                <p className="border-t border-gray-200 pt-3 mt-3 font-semibold text-gray-900 flex justify-between">
                  <span>Grand Total Paid:</span>
                  <span>₹ {orderData.totalAmount.toLocaleString("en-IN")}</span>
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Link
                  href="/shop"
                  className="bg-[#07512E] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#054024]"
                >
                  CONTINUE SHOPPING
                </Link>
                <Link
                  href="/profile"
                  className="border border-[#07512E] text-[#07512E] px-6 py-2.5 rounded font-semibold text-sm hover:bg-green-50/10"
                >
                  VIEW ACCOUNT HISTORY
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Order summary side widget */}
        {step !== 4 && (
          <div className="flex-1 bg-white pt-8 pb-8 px-6 rounded-lg shadow-sm border border-[#F0ECE3] w-full min-w-0 lg:min-w-[340px] sticky top-[120px] text-left font-sans">
            <h2 className="text-[24px] font-medium mb-6 mt-0 text-[#07512E] font-serif">Order Summary</h2>

            {/* List products */}
            <div className="max-h-72 overflow-y-auto mb-6 pr-1 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-50 rounded overflow-hidden shrink-0 border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0 text-xs">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity} | Size: {item.variant}</p>
                  </div>
                  <span className="font-semibold text-gray-900 text-xs shrink-0">
                    ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input block */}
            {step === 2 && (
              <div className="border border-[#E5E7EB] p-4 mb-6 bg-gray-50/35 rounded">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Apply Promo Code</h4>
                <div className="flex">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. VARDAAN50"
                    disabled={appliedCoupon}
                    className="flex-1 min-w-0 py-2 px-3 border border-[#E5E7EB] border-r-0 rounded-l outline-none text-xs bg-white uppercase font-semibold"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={appliedCoupon}
                    className="py-2 px-4 bg-[#07512E] hover:bg-[#054024] text-white border-none rounded-r cursor-pointer font-bold text-xs"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
                {appliedCoupon && (
                  <div className="mt-2 text-green-700 text-xs font-semibold flex items-center justify-between">
                    <span>Applied: {appliedCoupon.code}</span>
                    <button 
                      onClick={() => setAppliedCoupon(null)}
                      className="bg-transparent border-none text-xs text-red-500 cursor-pointer hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mb-3 text-[14px] text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">₹ {subtotal.toLocaleString("en-IN")}</span>
            </div>
            {discountVal > 0 && (
              <div className="flex justify-between mb-3 text-[14px] text-green-700 font-semibold">
                <span>Promo Discount</span>
                <span>- ₹ {discountVal.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between mb-3 text-[14px] text-gray-600">
              <span>Shipping cost</span>
              <span>{shippingCost > 0 ? `₹ ${shippingCost.toFixed(2)}` : "Free"}</span>
            </div>
            
            <div className="border-t border-gray-150 my-4 pt-4 flex justify-between text-[18px] font-bold text-[#111827]">
              <span>Estimated Grand Total</span>
              <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-6">
              <div className="flex items-center font-medium gap-2 text-[14px] text-gray-600 mb-3">
                <LuShieldCheck className="w-4.5 h-4.5 stroke-[2]" />
                Safe Checkout Covenant
              </div>
              <img
                src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781762762/6220ac0f912013c51947f9c4_1_meyyn1.png"
                alt="Safe Checkout Payment Methods"
                className="h-8 w-auto max-w-[200px]"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
