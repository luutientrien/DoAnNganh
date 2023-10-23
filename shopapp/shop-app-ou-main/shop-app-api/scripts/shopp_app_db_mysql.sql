

insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note)

values('admin','1','nguyễn văn q', '1990-10-14', 'm', '1234567890', '1', 'active','admin', '2022-02-03', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('quanly1','1','nguyễn văn a', '1991-10-14', 'm', '1234567890', '1', 'active', 'manager', '2022-01-03','admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('quanly2','1','nguyễn văn b', '1992-10-14', 'f', '1234567890', '1', 'active', 'manager', '2022-02-03', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung1','1','nguyễn văn c', '1993-10-14', 'm', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung2','1','nguyễn văn e', '1994-10-14', 'f', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung3','1','nguyễn văn f', '1995-10-14', 'f', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung4','1','nguyễn văn g', '1996-10-14', 'm', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into users(username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung5','1','nguyễn văn h', '1997-10-14', 'm', '1234567890', '1', 'active', 'register', '2022-05-03', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');


-- token đăng nhập
create table token(
	id					int not null,
	user_id				int NOT NULL AUTO_INCREMENT,
	token				nvarchar(255) not null,
CONSTRAINT PK_token PRIMARY KEY(id),
	CONSTRAINT FK_user_id FOREIGN KEY (user_id)		REFERENCES users(user_id)
);


-- hỗ trợ tìm kiếm theo loại sản phẩm
create table categorys(
	category_id			int NOT NULL AUTO_INCREMENT,
	name					nvarchar(50) null,
	description			nvarchar(255) null,
	validationflag		nvarchar(1) default '1' null,		
	created_date			datetime null,
	created_by			nvarchar(50) null,
	created_note			nvarchar(50) null,
	update_date			datetime null,
	update_by				nvarchar(50) null,
	update_note			nvarchar(50) null,
	CONSTRAINT PK_categorys PRIMARY KEY(category_id)
);

insert into categorys(name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 1','các mặc hàng quần áo', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into categorys(name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 2','các mặc hàng dày dép', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into categorys(name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 3','các mặc ba lô', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into categorys(name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 4','các mặc điện thoại', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into categorys(name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 5','các mặc hàng trong nhà', '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');


-- sản phẩm
create table products(
	product_id			int NOT NULL AUTO_INCREMENT,
	category_id			int not null,
	name					nvarchar(50) null,
	description			nvarchar(255) null,
	price					numeric default 0 null,
	stored_qty			numeric default 0 null,
	validationflag		nvarchar(1) default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	created_date			datetime null,
	created_by			nvarchar(50) null,
	created_note			nvarchar(50) null,
	update_date			datetime null,
	update_by				nvarchar(50) null,
	update_note			nvarchar(50) null,
	CONSTRAINT PK_products PRIMARY KEY(product_id),
	CONSTRAINT FK_category_id FOREIGN KEY (category_id)			REFERENCES categorys(category_id)
);

insert into products(category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(1,'quần 1', 'trang phục công sở', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into products(category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(1,'áo 2', 'trang phục thể thao', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into products(category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(1,'quần 3', 'trang phục ở nhà', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into products(category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(2,'dép 1', 'dép lào', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');
insert into products(category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(2,'dép 2', 'dép tổ ong', 200, 123, '1', '2022-01-03', 'admin', 'create by sql', '2022-01-03','admin', 'create by sql');




-- thông tin bài viết
create table sales_infos(
	sales_info_id			int NOT NULL AUTO_INCREMENT,
	product_id			int not null,
	title					nvarchar(50) null,
	content				nvarchar(255) null,
	image					nvarchar(255) null,
	validationflag		nvarchar(1) default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	created_date			datetime null,
	created_by			nvarchar(50) null,
	created_note			nvarchar(50) null,
	update_date			datetime null,
	update_by				nvarchar(50) null,
	update_note			nvarchar(50) null,
	CONSTRAINT PK_sales_infos PRIMARY KEY(sales_info_id),
	CONSTRAINT FK_product_id	FOREIGN KEY (product_id)		REFERENCES products(product_id)
);

insert into sales_infos (product_id,title,content,image,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(1,'title 1', 'content 1', '../../assets/images/1.jpg','1', '2022-05-09', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into sales_infos (product_id,title,content,image,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(2,'title 2', 'content 2', '../../assets/images/2.jpg','1', '2022-05-09', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into sales_infos (product_id,title,content,image,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(3,'title 3', 'content 3', '../../assets/images/3.jpg','1', '2022-05-09', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into sales_infos (product_id,title,content,image,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(4,'title 4', 'content 4', '../../assets/images/4.jpg','1', '2022-05-09', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');
insert into sales_infos (product_id,title,content,image,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(5,'title 5', 'content 5', '../../assets/images/5.jpg','1', '2022-05-09', 'admin', 'create by sql', '2022-05-09','admin', 'create by sql');


-- hóa đơn
create table orders(
	order_id				int NOT NULL AUTO_INCREMENT,
	user_id				int not null,
	product_id			int not null,
	total_qty				numeric default 0 null,
	total_price			numeric default 0 null,
	validationflag		nvarchar(1) default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	created_date			datetime null,
	created_by			nvarchar(50) null,
	created_note			nvarchar(50) null,
	update_date			datetime null,
	update_by				nvarchar(50) null,
	update_note			nvarchar(50) null,
	CONSTRAINT PK_orders PRIMARY KEY(order_id),
	CONSTRAINT FK2_user_id FOREIGN KEY (user_id)			REFERENCES users(user_id),
	CONSTRAINT FK2_product_id FOREIGN KEY (product_id)		REFERENCES products(product_id)
);

