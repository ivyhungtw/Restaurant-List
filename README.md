# 餐廳清單網站

此專案提供使用者瀏覽、新增、修改、搜尋及刪除餐廳

## 功能列表

- 瀏覽所有餐廳
- 依照餐廳名稱及餐廳類別搜尋
- 依照餐廳名稱、類別或評分排序餐廳
- 檢視餐廳詳細資訊，包含評分、類別、地址、電話、圖片及 Google Map
- 新增一筆餐廳資料
- 修改一筆餐廳資料
- 刪除一筆餐廳資料
- 登入帳號

## 專案畫面

![Home page](/public/photos/index.png)
![Restaurant page](/public/photos/show.png)

## 安裝與執行步驟

#### 下載專案

```
git clone https://github.com/ivyhungtw/Restaurant-List.git
```

#### 移動至專案資料夾

```
cd Restaurant-List
```

#### 安裝套件

```
npm install
```

#### 載入 seed data

```
npm run seed
```

#### 使用 nodemon 啟動伺服器

```
npm run dev
```

啟動後請至 [http://localhost:3000](http://localhost:3000) 開始使用

## 環境建置

- Node.js v12.15.1 -執行環境
- Express v4.17.1 -框架
- Express-handlebars v5.2.0 -模板引擎
- mongoDB Community Serve v4.2.12 -資料庫
- mongoose v5.11.13 -ODM
