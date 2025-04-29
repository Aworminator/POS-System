# PRC-Recreate

## Description

PRC-Recreate is a Point of Sale (POS) system designed specifically for managing first aid products. This system allows users to add, update, and clear product quantities, view pricing, and manage inventory efficiently. It is a full-stack web application built to demonstrate proficiency in modern web development technologies.

## Features

- **Dynamic Inventory Management**: Add, update, and reset product quantities.
- **Price Calculation**: Automatically calculate total prices based on product quantities.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Database Integration**: Stores and retrieves product data using PostgreSQL.
- **Interactive UI**: Built with EJS templates and JavaScript for a seamless user experience.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building server-side logic.
- **EJS**: Embedded JavaScript templates for dynamic HTML rendering.
- **PostgreSQL**: Relational database for storing product and inventory data.
- **JavaScript**: Client-side interactivity and logic.
- **HTML5**: Structure and content of the web application.
- **CSS3**: Styling and responsive design.
- **Font Awesome**: Icons for a polished user interface.
- **dotenv**: Environment variable management.
- **express-session**: Session management for user interactions.

## How It Works

1. **Home Page**: Displays a list of first aid products with options to add quantities or reset them.
2. **Update Page**: Allows users to view and update product prices.
3. **Right-click to Delete**: Right-click on the box to show the trash can and delete items from the list.
4. **Database Integration**: All product data is fetched and updated in real-time using PostgreSQL.
5. **Clear All Functionality**: Resets all product quantities to zero with a single click.

## Live Demo

You can view the live demo of the application here: [PRC-Recreate Live Demo](https://first-aid-pos-system.onrender.com)

**Note**: The application is optimized for desktop viewing. Due to limitations with Render.com, it may not render properly on mobile devices.

## Screenshots

### Home Page

![Home Page](./content/POS%20screenshot%201.png)

### Update Page

![Update Page](./content/POS%20screenshot%202.png)

## Future Enhancements

- Add user authentication for secure access.
- Implement detailed reporting for sales and inventory.
- Enhance UI with additional animations and transitions.

## License

This project is open-source and available under the [MIT License](LICENSE).
