# Guwahati Flowers - Flower Shop Website

A beautiful, fully functional flower shop website with customer-facing product display and an admin panel for managing inventory.

## Features

### 🌸 Customer Features
- Browse flower bouquets by category (Roses, Tulips, Sunflowers, Mixed, etc.)
- View bouquet details including name, description, and price
- Direct WhatsApp integration - click to chat with admin
- Responsive design works on all devices
- Beautiful, modern UI

### 👨‍💼 Admin Features
- Secure login system
- Upload new flower bouquet images
- Manage product categories
- Set prices and descriptions
- View all products
- Delete products
- Session persistence

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project folder:**
```bash
cd "Guwahati Flowers"
```

2. **Install dependencies:**
```bash
npm install
```

### Running the Application

1. **Start the server:**
```bash
npm start
```

2. **Open in browser:**
```
http://localhost:3000
```

### First Time Setup

**Default Admin Credentials:**
- Username: `admin`
- Password: `guwahati123`

⚠️ **IMPORTANT:** Change these credentials in production! Edit the `ADMIN_USERNAME` and `ADMIN_PASSWORD` in [server.js](server.js)

## How to Use

### For Customers
1. Visit `http://localhost:3000`
2. Browse flower bouquets by category
3. Click "Chat on WhatsApp" to contact about a specific bouquet
4. Complete your order via WhatsApp

### For Admin
1. Visit `http://localhost:3000/admin.html`
2. Login with admin credentials
3. Click "Upload New Bouquet" form to add products
4. Fill in:
   - Title (bouquet name)
   - Category (predefined categories available)
   - Price (in ₹)
   - Description
   - Image file
5. Click "Upload Bouquet"
6. View all uploaded products in the table below
7. Delete products using the Delete button

## File Structure

```
Guwahati Flowers/
├── server.js              # Express backend server
├── package.json           # Dependencies
├── public/
│   ├── index.html        # Customer homepage
│   ├── admin.html        # Admin login & dashboard
│   ├── style.css         # Styling for customer site
│   ├── script.js         # Frontend JavaScript for customer
│   └── admin.js          # Admin panel JavaScript
├── uploads/              # Folder for uploaded images
└── data/
    └── products.json     # Product database (JSON)
```

## WhatsApp Integration

The website automatically generates WhatsApp messages when users click "Chat on WhatsApp". The phone number needs to be set up. To configure:

1. Add your WhatsApp Business number
2. Edit the WhatsApp link in [script.js](public/script.js) to include your phone number

Current format:
```javascript
href="https://wa.me/?text=Hi! I'm interested in the ${product.title} bouquet"
```

To add your phone number:
```javascript
href="https://wa.me/919876543210?text=Hi! I'm interested in the ${product.title} bouquet"
```

Replace `919876543210` with your actual phone number including country code.

## Customization

### Change Admin Credentials
Edit [server.js](server.js):
```javascript
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '';
```

### Add More Categories
Edit the category dropdown in [admin.html](public/admin.html):
```html
<select id="category" required>
  <option value="Your Category">Your Category</option>
</select>
```

Also update the filter buttons in [index.html](public/index.html)

### Styling
All CSS is in [style.css](public/style.css). Color variables can be customized at the top:
```css
:root {
  --primary-color: #e91e63;
  --secondary-color: #ff69b4;
}
```

## Deployment

### Local Testing
```bash
npm start
```

### Production Deployment
1. Set strong admin credentials
2. Use environment variables for sensitive data
3. Deploy to services like:
   - Heroku
   - Vercel
   - AWS
   - DigitalOcean
   - Any Node.js hosting

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/category/:category` | Get products by category |
| POST | `/api/products` | Upload new product (requires auth) |
| DELETE | `/api/products/:id` | Delete product (requires auth) |
| POST | `/api/login` | Admin login |

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **File Upload:** Multer
- **Storage:** JSON (can be upgraded to MongoDB, PostgreSQL, etc.)
- **Styling:** Custom CSS with responsive design

## Notes

- Images are stored in the `/uploads` folder
- Product metadata is stored in `/data/products.json`
- The app includes sample bouquets with images from Unsplash
- Replace these with your actual flower images

## Troubleshooting

**Port 3000 already in use:**
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or change port in server.js
const PORT = 3001;
```

**Images not uploading:**
- Check `/uploads` folder permissions
- Ensure file size is reasonable
- Verify image format is supported (jpg, jpeg, png, gif)

**WhatsApp link not working:**
- Verify phone number format includes country code
- Test link format: `https://wa.me/[country][number]`

## Support

For issues or questions, check the console logs in browser developer tools (F12) for debugging information.

---

🌸 Happy selling! Build a great flower business with this beautiful website.
