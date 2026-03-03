CREATE TABLE roles (
    role_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    role_id BIGINT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20),
    hire_date DATE,
    employment_status ENUM('Active','Inactive') DEFAULT 'Active',
    
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    employee_id BIGINT NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    account_status ENUM('Active','Inactive') DEFAULT 'Active',
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        ON DELETE CASCADE
);

CREATE TABLE customers (
    customer_id BIGINT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100)
);

CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE menu_items (
    item_id BIGINT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    availability_status ENUM('Available','Unavailable') DEFAULT 'Available',
    
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE RESTRICT
);

CREATE TABLE restaurant_tables (
    table_id BIGINT PRIMARY KEY,
    table_number BIGINT NOT NULL UNIQUE,
    capacity BIGINT NOT NULL CHECK (capacity > 0),
    table_status ENUM('Available','Occupied','Reserved') DEFAULT 'Available'
);

CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    table_id BIGINT,
    customer_id BIGINT,
    employee_id BIGINT NOT NULL,
    order_type ENUM('Dine-in','Take-out','Delivery') DEFAULT 'Dine-in',
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    order_status ENUM('Pending','Preparing','Served','Completed','Cancelled') DEFAULT 'Pending',
    
    FOREIGN KEY (table_id) REFERENCES restaurant_tables(table_id)
        ON DELETE SET NULL,
        
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE SET NULL,
        
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        ON DELETE RESTRICT
);

CREATE TABLE order_details (
    order_detail_id BIGINT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    quantity BIGINT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price) STORED,
    
    UNIQUE KEY unique_order_item (order_id, item_id),

    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE,
        
    FOREIGN KEY (item_id) REFERENCES menu_items(item_id)
        ON DELETE RESTRICT
);

CREATE TABLE payments (
    payment_id BIGINT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('Cash','GCash','Credit Card','Debit Card') NOT NULL,
    amount_received DECIMAL(10,2),
    change_amount DECIMAL(10,2),
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Paid','Unpaid') DEFAULT 'Paid',
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE
);

CREATE TABLE ingredients (
    ingredient_id BIGINT PRIMARY KEY,
    ingredient_name VARCHAR(150) NOT NULL UNIQUE,
    stock_quantity DECIMAL(10,2) NOT NULL,
    status ENUM('High', 'Low', 'Out of Stocks'),
    unit VARCHAR(50) NOT NULL
);

CREATE TABLE menu_ingredients (
    menu_ingredient_id BIGINT PRIMARY KEY,
    item_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    quantity_required DECIMAL(10,2) NOT NULL,

    UNIQUE KEY unique_menu_ingredient (item_id, ingredient_id),

    FOREIGN KEY (item_id) REFERENCES menu_items(item_id)
        ON DELETE CASCADE,
        
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
        ON DELETE RESTRICT
);

