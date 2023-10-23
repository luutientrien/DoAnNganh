CREATE DATABASE shop_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop_app;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(50) NOT NULL,
    date_ob DATE,
    gen VARCHAR(1),
    phone VARCHAR(10),
    validationflag VARCHAR(1) DEFAULT '1',
    status_acc VARCHAR(20) DEFAULT 'active',
    role_name VARCHAR(50) DEFAULT 'register',
    created_date DATETIME,
    created_by VARCHAR(50),
    created_note VARCHAR(50),
    update_date DATETIME,
    update_by VARCHAR(50),
    update_note VARCHAR(50)
);

INSERT INTO users (username, password, name, date_ob, gen, phone, validationflag, status_acc, role_name, created_date, created_by, created_note, update_date, update_by, update_note)
VALUES
    ('admin', '1', 'nguyễn văn q', '1990-10-14', 'm', '1234567890', '1', 'active', 'admin', '2022-02-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    ('quanly1', '1', 'nguyễn văn a', '1991-10-14', 'm', '1234567890', '1', 'active', 'manager', '2022-01-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    ('quanly2', '1', 'nguyễn văn b', '1992-10-14', 'f', '1234567890', '1', 'active', 'manager', '2022-02-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    ('nguoidung1', '1', 'nguyễn văn c', '1993-10-14', 'm', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    ('nguoidung2', '1', 'nguyễn văn e', '1994-10-14', 'f', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    ('nguoidung3', '1', 'nguyễn văn f', '1995-10-14', 'f', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    ('nguoidung4', '1', 'nguyễn văn g', '1996-10-14', 'm', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    ('nguoidung5', '1', 'nguyễn văn h', '1997-10-14', 'm', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql');

CREATE TABLE token (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL,
    UNIQUE KEY unique_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE categorys (
    category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    validationflag VARCHAR(1) DEFAULT '1',
    created_date DATETIME,
    created_by VARCHAR(50),
    created_note VARCHAR(50),
    update_date DATETIME,
    update_by VARCHAR(50),
    update_note VARCHAR(50)
);

INSERT INTO categorys (name, description, validationflag, created_date, created_by, created_note, update_date, update_by, update_note)
VALUES
    ('sản phẩm loại 1', 'các mặc hàng quần áo', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    ('sản phẩm loại 2', 'các mặc hàng dày dép', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    ('sản phẩm loại 3', 'các mặc ba lô', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    ('sản phẩm loại 4', 'các mặc điện thoại', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    ('sản phẩm loại 5', 'các mặc hàng trong nhà', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql');


CREATE TABLE products (
    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(50),
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0,
    stored_qty DECIMAL(10, 2) DEFAULT 0,
    validationflag VARCHAR(1) DEFAULT '1',
    created_date DATETIME,
    created_by VARCHAR(50),
    created_note VARCHAR(50),
    update_date DATETIME,
    update_by VARCHAR(50),
    update_note VARCHAR(50),
    FOREIGN KEY (category_id) REFERENCES categorys(category_id)
);

INSERT INTO products (category_id, name, description, price, stored_qty, validationflag, created_date, created_by, created_note, update_date, update_by, update_note)
VALUES
    (1, 'quần 1', 'trang phục công sở', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    (1, 'áo 2', 'trang phục thể thao', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    (1, 'quần 3', 'trang phục ở nhà', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    (2, 'dép 1', 'dép lào', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql'),
    (2, 'dép 2', 'dép tổ ong', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03', 'admin', 'create by sql');

CREATE TABLE sales_infos (
    sales_info_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    title VARCHAR(50),
    content TEXT,
    image TEXT,
    validationflag VARCHAR(1) DEFAULT '1',
    created_date DATETIME,
    created_by VARCHAR(50),
    created_note VARCHAR(50),
    update_date DATETIME,
    update_by VARCHAR(50),
    update_note VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO sales_infos (product_id, title, content, image, validationflag, created_date, created_by, created_note, update_date, update_by, update_note)
VALUES
    (1, 'title 1', 'content 1', '../../assets/images/1.jpg', '1', '2022-05-09', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    (2, 'title 2', 'content 2', '../../assets/images/2.jpg', '1', '2022-05-09', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    (3, 'title 3', 'content 3', '../../assets/images/3.jpg', '1', '2022-05-09', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    (4, 'title 4', 'content 4', '../../assets/images/4.jpg', '1', '2022-05-09', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql'),
    (5, 'title 5', 'content 5', '../../assets/images/5.jpg', '1', '2022-05-09', 'admin', 'create by sql', '2022-05-09', 'admin', 'create by sql');



CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    total_qty DECIMAL(10, 2) DEFAULT 0,
    total_price DECIMAL(10, 2) DEFAULT 0,
    validationflag VARCHAR(1) DEFAULT '1',
    created_date DATETIME,
    created_by VARCHAR(50),
    created_note VARCHAR(50),
    update_date DATETIME,
    update_by VARCHAR(50),
    update_note VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


