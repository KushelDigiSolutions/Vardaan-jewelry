const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\aayus\\OneDrive\\javascript\\Desktop\\vardan-jewellry\\Vardaan-jewelry\\src\\components';
const files = fs.readdirSync(dir).filter(f => (f.startsWith('About') || f.startsWith('Contact')) && f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text-[14px] md:text-[16px] with text-[18px]
    content = content.replace(/text-\[14px\] md:text-\[16px\]/g, 'text-[18px]');
    
    // Replace text-[16px] md:text-[18px] with text-[18px] (if already modified)
    content = content.replace(/text-\[16px\] md:text-\[18px\]/g, 'text-[18px]');
    
    // Replace text-[14px] (where md is not present) with text-[18px]
    content = content.replace(/className="text-\[14px\]/g, 'className="text-[18px]');
    content = content.replace(/className="text-\[14\.5px\]/g, 'className="text-[18px]');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
});
