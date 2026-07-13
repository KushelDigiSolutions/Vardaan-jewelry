"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { LuShieldCheck } from "react-icons/lu";
import { FiCheck, FiMapPin, FiPlus, FiChevronLeft, FiCreditCard } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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
    country: "India",
    mobile: ""
  });

  // Shipping & Coupon states
  const [shippingMethod, setShippingMethod] = useState("Standard Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount }
  const [couponError, setCouponError] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const [fetchingCoupons, setFetchingCoupons] = useState(false);

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

  // Fetch available coupons for suggestions
  const fetchAvailableCoupons = async () => {
    if (availableCoupons.length > 0) return; // already fetched
    setFetchingCoupons(true);
    try {
      const res = await fetch(`${API_URL}/coupons`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        // Only show active coupons
        setAvailableCoupons(json.data.filter(c => c.isActive));
      }
    } catch (err) {
      console.error("Failed to fetch coupons", err);
    } finally {
      setFetchingCoupons(false);
    }
  };

  // Apply Coupon code
  const handleApplyCoupon = async (codeOverride) => {
    setCouponError("");
    const code = (codeOverride || couponInput).trim();
    if (!code) return;
    try {
      const res = await fetch(`${API_URL}/coupons/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code, orderAmount: subtotal })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Coupon invalid");
      }
      setAppliedCoupon({
        code: json.data.code,
        discount: json.data.discount
      });
      setCouponInput(json.data.code);
      setShowCouponDropdown(false);
    } catch (err) {
      setCouponError(err.message || "Coupon is invalid or expired");
      setAppliedCoupon(null);
    }
  };

  // Compute Shipping Fees (applicable only on orders below 399 after discount)
  const discountVal = appliedCoupon ? appliedCoupon.discount : 0;
  const amountBeforeShipping = Math.max(0, subtotal - discountVal);
  
  // Calculate online discount and COD charge
  const codCharge = paymentMethod === "COD" ? 100 : 0;
  const onlineDiscount = paymentMethod !== "COD" ? Math.round(amountBeforeShipping * 0.05) : 0;
  
  const amountAfterPaymentAdjustments = amountBeforeShipping + codCharge - onlineDiscount;
  const shippingCost = shippingMethod === "Express Delivery" ? 150 : (amountAfterPaymentAdjustments <= 399 ? 50 : 0);
  
  // Compute Grand Total
  const grandTotal = amountAfterPaymentAdjustments + shippingCost;

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
            country: addressDetails.country,
            mobile: addressDetails.mobile || user?.mobile || ""
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
        // Run Razorpay Gateway flow
        setStep(3);
        handleRazorpayPayment(order);
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Handle real Razorpay payment
  const handleRazorpayPayment = async (order) => {
    try {
      setErrorMsg("");
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Failed to load Razorpay payment gateway script. Please check your internet connection.");
      }

      const initiateRes = await fetch(`${API_URL}/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderId: order._id })
      });

      const initiateJson = await initiateRes.json();
      if (!initiateRes.ok) {
        throw new Error(initiateJson.message || "Failed to initiate payment session");
      }

      const session = initiateJson.data;

      const options = {
        key: session.key,
        amount: Math.round(session.amount * 100),
        currency: session.currency,
        name: "Vardaan Store",
        description: `Order #${order._id.substring(18)} Checkout`,
        image: "/icon.png",
        order_id: session.gatewayOrderId,
        handler: async function (response) {
          setLoading(true);
          try {
            const verifyRes = await fetch(`${API_URL}/payments/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                orderId: order._id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyJson = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyJson.message || "Payment verification failed");
            }

            setOrderData(verifyJson.data);
            setStep(4);
            clearCart();
          } catch (verifyErr) {
            setErrorMsg(verifyErr.message || "Payment verification failed.");
            setStep(2);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: order.shippingAddress?.mobile || user?.mobile || ""
        },
        theme: {
          color: "#07512E"
        },
        modal: {
          ondismiss: function () {
            setErrorMsg("Payment process was cancelled by user.");
            setStep(2);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to launch Razorpay payment gateway.");
      setStep(2);
    }
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
          <h3 className="text-2xl font-serif text-[#07512E] mb-3">Sign In to Continue</h3>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-6">
            You must sign in to save shipping addresses and place orders securely.
          </p>
          <Link
            href={`/login?redirect=/checkout`}
            className="inline-block bg-[#07512E] text-[#FFDE59] px-8 py-3 rounded font-sans font-semibold hover:bg-[#054024] transition-colors"
          >
            SIGN IN 
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
      <div className="w-full max-w-[1280px] flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Left Column: Wizard Forms */}
        <div className="flex-[2] bg-white p-6 sm:p-8 rounded-lg shadow-sm w-full border border-[#F0ECE3]">
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded">
              {errorMsg}
            </div>
          )}

          {/* Wizard step Indicators */}
          <div className="flex  justify-between flex-wrap gap-4 xl:gap-0 lg:flex-nowrap items-center mb-8 pb-4 border-b border-gray-150 font-sans text-xs sm:text-sm text-gray-400 font-medium">
           
            <span className={`text-[18px] ${step === 1 ? "text-[#07512E]   font-semibold" : step > 1 ? "text-gray-900 " : ""}`}>1. Delivery Address</span>
            <span className="text-gray-300">→</span>
            <span className={`text-[18px] ${step === 2 ? "text-[#07512E]  font-semibold" : step > 2 ? "text-gray-900" : ""}`}>2. Payment & Promos</span>
            <span className="text-gray-300">→</span>
            <span className={`text-[18px] ${step === 3 ? "text-[#07512E] font-semibold" : step > 3 ? "text-gray-900" : ""}`}>3. Payment Capture</span>
            <span className="text-gray-300">→</span>
            <span className={`text-[18px] ${step === 4 ? "text-[#07512E] font-semibold" : ""}`}>4. Confirmation</span>
          </div>

          {/* STEP 1: Address Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-[26px] font-serif text-[#07512E] mb-6 font-normal">Select Shipping Address</h3>
              
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
                    className="flex items-center gap-2 border border-dashed border-[#07512E] text-[#07512E] py-2 md: py-4 rounded justify-center font-sans font-semibold text-[16px] hover:bg-green-50/10 transition-colors cursor-pointer"
                  >
                    <FiPlus /> Add New Shiping Address
                  </button>

                  <div className="flex justify-between flex-col md:flex-row  gap-4 border-t border-gray-100 pt-6 mt-6">
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
                      className="bg-[#07512E] text-white px-4 md:px-8 py-3 rounded font-sans font-semibold text-[14px] md:text-sm  hover:bg-[#054024] cursor-pointer"
                    >
                      Continue to Payment
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
                    <label className="block text-gray-600 font-medium mb-1.5">Contact Phone Number</label>
                    <input type="text" name="mobile" required value={newAddr.mobile} onChange={handleAddrChange} className="w-full p-2.5 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E]" placeholder="10-digit mobile number" />
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
                <h4 className="text-[18px] font-medium  tracking-wider text-gray-400 mb-3">Select Shipping Method</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`flex justify-between items-center p-4 border rounded cursor-pointer ${shippingMethod === "Standard Delivery" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <div className="flex items-center justify-start gap-2">
                      <input type="radio" checked={shippingMethod === "Standard Delivery"} onChange={() => setShippingMethod("Standard Delivery")} className="accent-[#07512E] " />
                      <div className="flex flex-col ">
                        <p className="font-medium text-[18px] text-gray-900">Standard Shipping</p>
                        <p className="text-sm text-gray-500">3 - 6 business days</p>
                      </div>
                    </div>
                    <span className="font-medium text-[18px] text-[#2e8b57]">Free</span>
                  </label>
                  
                  {/* <label className={`flex justify-between items-center p-4 border rounded cursor-pointer ${shippingMethod === "Express Delivery" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" checked={shippingMethod === "Express Delivery"} onChange={() => setShippingMethod("Express Delivery")} className="accent-[#07512E]" />
                      <div>
                        <p className="font-medium text-[18px] text-gray-900">Express Shipping</p>
                        <p className="text-sm text-gray-500">1 - 2 business days</p>
                      </div>
                    </div>
                    <span className="font-medium text-[18px] text-gray-900">₹ 150.00</span>
                  </label> */}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8 font-sans">
                <h4 className="text-xl font-medium tracking-wider text-gray-400 mb-3">Select Payment Gateway</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className={`flex flex-col p-4 border rounded cursor-pointer gap-2 ${paymentMethod === "Razorpay" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <input type="radio" checked={paymentMethod === "Razorpay"} onChange={() => setPaymentMethod("Razorpay")} className="accent-[#07512E] self-start" />
                    <div>
                      <p className="font-medium text-[18px] text-gray-900 flex items-center gap-1.5">
                        Online <span className="text-[11px] bg-green-700 text-white px-2 py-0.5 rounded font-normal font-sans">5% OFF</span>
                      </p>
                      <p className="text-sm text-gray-500">UPI/Gateway</p>
                    </div>
                  </label>

                  {/* <label className={`flex flex-col p-4 border rounded cursor-pointer gap-2 ${paymentMethod === "Card" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <input type="radio" checked={paymentMethod === "Card"} onChange={() => setPaymentMethod("Card")} className="accent-[#07512E] self-start" />
                    <div>
                      <p className="font-medium text-[18px] text-gray-900">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Simulate Visa/Mastercard</p>
                    </div>
                  </label> */}
                  
                  <label className={`flex flex-col p-4 border rounded cursor-pointer gap-2 ${paymentMethod === "COD" ? "border-[#07512E] bg-green-50/20" : "border-gray-200"}`}>
                    <input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} className="accent-[#07512E] self-start" />
                    <div>
                      <p className="font-medium text-[18px] text-gray-900 flex items-center gap-1.5">
                        Cash on Delivery <span className="text-[11px] bg-red-650 text-white px-2.5 py-0.5 rounded font-normal font-sans">Handling Charge +₹100</span>
                      </p>
                      <p className="text-sm text-gray-500">Pay on parcel arrival</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Back & Place Buttons */}              <div className="flex flex-col gap-4 justify-between border-t border-gray-100 pt-6 mt-6">
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
                  {loading ? "Processing Order..." : "Place order & Checkout"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Razorpay Payment Gateway */}
          {step === 3 && (
            <div className="text-center py-16 animate-fade-in font-sans">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-[#07512E] animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment Gateway</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                Please complete the payment in the secure Razorpay checkout modal. Do not close or refresh this page.
              </p>
              <div className="mt-8 text-[#07512E] text-lg font-bold flex items-center justify-center gap-2">
                <FiCreditCard /> Awaiting payment capture...
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
                
                {orderData.codCharge > 0 && (
                  <p className="mb-2 text-red-600"><b>Handling Charge:</b> <span>+ ₹ {orderData.codCharge.toLocaleString("en-IN")}</span></p>
                )}
                {orderData.onlineDiscount > 0 && (
                  <p className="mb-2 text-green-750"><b>Online Payment Discount (5%):</b> <span>- ₹ {orderData.onlineDiscount.toLocaleString("en-IN")}</span></p>
                )}
                
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
                <div key={`${item.id}-${item.variant}`} className="flex gap-3 flex-col md:flex-row items-start">
                  <div className="w-20 h-20 bg-gray-50 rounded overflow-hidden shrink-0 border">
                    <img src={item.image || "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png"} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0 text-md">
                    <p className="font-semibold text-gray-900  text-[16px]">{item.name}</p>
                    <p className="text-gray-500 text-[16px]">
                      Qty: {item.quantity} | {item.variant.startsWith("Size:") || item.variant.startsWith("Size :")
                        ? item.variant
                        : `Size: ${item.variant}`}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900 text-xs text-[16px] mt-1 shrink-0">
                    ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input block */}
            {step === 2 && (
              <div className="border border-[#E5E7EB] p-4 mb-6 bg-gray-50/35 rounded">
                <h4 className="text-xs font-medium  tracking-wider text-gray-400 mb-2">Click input filed for Available Promo Codes</h4>
                
                {/* Input + Apply button */}
                <div className="relative">
                  <div className="flex">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      onFocus={() => {
                        setShowCouponDropdown(true);
                        fetchAvailableCoupons();
                      }}
                      onBlur={() => setTimeout(() => setShowCouponDropdown(false), 180)}
                      placeholder="e.g. VARDAAN50"
                      disabled={!!appliedCoupon}
                      className="flex-1 min-w-0 py-2 px-3 border border-[#E5E7EB] border-r-0 rounded-l outline-none text-xs bg-white uppercase  focus:border-[#07512E] transition-colors"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      disabled={!!appliedCoupon || !couponInput.trim()}
                      className="py-2 px-4 bg-[#07512E] hover:bg-[#054024] disabled:opacity-50 disabled:cursor-not-allowed text-white border-none rounded-r cursor-pointer font-bold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Coupon Suggestions Dropdown */}
                  {showCouponDropdown && !appliedCoupon && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded shadow-lg z-50 max-h-48 overflow-y-auto">
                      {fetchingCoupons ? (
                        <div className="px-3 py-3 text-xs text-gray-400 text-center">Loading available coupons...</div>
                      ) : availableCoupons.length === 0 ? (
                        <div className="px-3 py-3 text-xs text-gray-400 text-center">No active coupons available</div>
                      ) : (
                        availableCoupons
                          .filter(c =>
                            !couponInput || c.code.includes(couponInput.toUpperCase())
                          )
                          .map((coupon) => (
                            <button
                              key={coupon._id}
                              onMouseDown={() => handleApplyCoupon(coupon.code)}
                              className="w-full text-left px-3 py-2.5 hover:bg-green-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-[#07512E] text-xs tracking-wide font-mono">{coupon.code}</span>
                                <span className="text-[10px] bg-[#07512E] text-white px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                                  {coupon.discountType === "percentage"
                                    ? `${coupon.discountValue}% OFF`
                                    : `₹${coupon.discountValue} OFF`
                                  }
                                </span>
                              </div>
                              {coupon.minOrderAmount > 0 && (
                                <p className="text-[10px] text-gray-400 mt-0.5">Min order: ₹{coupon.minOrderAmount}</p>
                              )}
                            </button>
                          ))
                      )}
                    </div>
                  )}
                </div>

                {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
                {appliedCoupon && (
                  <div className="mt-2 text-green-700 text-xs font-semibold flex items-center justify-between">
                    <span>✓ Applied: <span className="font-mono">{appliedCoupon.code}</span> — Saved ₹{appliedCoupon.discount.toLocaleString("en-IN")}</span>
                    <button
                      onClick={() => { setAppliedCoupon(null); setCouponInput(""); }}
                      className="bg-transparent border-none text-xs text-red-500 cursor-pointer hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mb-3 text-[16px] text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">₹ {subtotal.toLocaleString("en-IN")}</span>
            </div>
            {discountVal > 0 && (
              <div className="flex justify-between mb-3 text-[16px] text-green-700 font-semibold">
                <span>Promo Discount</span>
                <span>- ₹ {discountVal.toLocaleString("en-IN")}</span>
              </div>
            )}
            {codCharge > 0 && (
              <div className="flex justify-between mb-3 text-[16px] text-red-600 font-semibold">
                <span>Handling Charge</span>
                <span>+ ₹ {codCharge.toLocaleString("en-IN")}</span>
              </div>
            )}
            {onlineDiscount > 0 && (
              <div className="flex justify-between mb-3 text-[16px] text-green-700 font-semibold">
                <span>Online Payment Discount (5%)</span>
                <span>- ₹ {onlineDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between mb-3 text-[16px] text-gray-600">
              <span>Shipping cost</span>
              <span>{shippingCost > 0 ? `₹ ${shippingCost.toFixed(2)}` : "Free"}</span>
            </div>
            
            <div className="border-t border-gray-150 my-4 pt-4 flex justify-between text-[18px] font-bold text-[#111827]">
              <span>Estimated Grand Total</span>
              <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-6">
              <div className="flex items-center font-medium gap-2 text-[16px] text-gray-600 mb-3">
                <LuShieldCheck className="w-5 h-5 stroke-[2]" />
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
