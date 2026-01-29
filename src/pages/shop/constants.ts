// Filter options
export const brands = [
  { value: "all", label: "Tất cả" },
  { value: "tea4life", label: "Tea4Life" },
  { value: "cozy", label: "Cozy" },
  { value: "phuc-long", label: "Phúc Long" },
  { value: "highlands", label: "Highlands" },
];

export const regions = [
  { value: "all", label: "Tất cả" },
  { value: "thai-nguyen", label: "Thái Nguyên" },
  { value: "lam-dong", label: "Lâm Đồng" },
  { value: "ha-giang", label: "Hà Giang" },
  { value: "tay-ho", label: "Tây Hồ" },
  { value: "moc-chau", label: "Mộc Châu" },
];

export const sizes = [
  { value: "all", label: "Tất cả" },
  { value: "50g", label: "50g" },
  { value: "100g", label: "100g" },
  { value: "200g", label: "200g" },
  { value: "500g", label: "500g" },
];

export const categories = [
  {
    value: "tra-xanh",
    label: "Trà Xanh",
    description: "Hương vị tươi mát, giàu chất chống oxy hóa.",
    icon: "Leaf",
  },
  {
    value: "tra-o-long",
    label: "Trà Ô Long",
    description: "Hương thơm nồng nàn, hậu vị ngọt sâu.",
    icon: "Coffee",
  },
  {
    value: "tra-thao-moc",
    label: "Trà Thảo Mộc",
    description: "Thư giãn tinh thần, hỗ trợ sức khỏe.",
    icon: "Flower2",
  },
  {
    value: "tra-sen",
    label: "Trà Sen",
    description: "Sự kết hợp tinh tế, đậm đà bản sắc Việt.",
    icon: "Sprout",
  },
];

// Mock products data
export const allProducts = [
  {
    id: 1,
    name: "Trà Ô Long Cao Cấp",
    price: 350000,
    size: "100g",
    brand: "tea4life",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Trà Xanh Thái Nguyên",
    price: 280000,
    size: "100g",
    brand: "tea4life",
    region: "thai-nguyen",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Trà Sen Tây Hồ",
    price: 420000,
    size: "200g",
    brand: "tea4life",
    region: "tay-ho",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Trà Hoa Cúc",
    price: 220000,
    size: "50g",
    brand: "cozy",
    region: "ha-giang",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Trà Ô Long Đặc Biệt",
    price: 480000,
    size: "200g",
    brand: "phuc-long",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Trà Xanh Mộc Châu",
    price: 320000,
    size: "100g",
    brand: "highlands",
    region: "moc-chau",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1582793988951-dec231879fc3?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Trà Đen Premium",
    price: 380000,
    size: "100g",
    brand: "cozy",
    region: "thai-nguyen",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Trà Thảo Mộc Detox",
    price: 250000,
    size: "50g",
    brand: "tea4life",
    region: "ha-giang",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Trà Sen Đặc Biệt",
    price: 550000,
    size: "500g",
    brand: "phuc-long",
    region: "tay-ho",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1558160074456-29fc4cc8cde9?w=400&h=400&fit=crop",
  },
  {
    id: 10,
    name: "Trà Xanh Hảo Hạng",
    price: 400000,
    size: "200g",
    brand: "tea4life",
    region: "thai-nguyen",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=400&fit=crop",
  },
  {
    id: 11,
    name: "Trà Ô Long Lâm Đồng",
    price: 300000,
    size: "100g",
    brand: "highlands",
    region: "lam-dong",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=400&fit=crop",
  },
  {
    id: 12,
    name: "Trà Đen Cổ Điển",
    price: 290000,
    size: "100g",
    brand: "tea4life",
    region: "thai-nguyen",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop",
  },
  {
    id: 13,
    name: "Trà Hoa Nhài",
    price: 260000,
    size: "50g",
    brand: "cozy",
    region: "ha-giang",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=400&h=400&fit=crop",
  },
  {
    id: 14,
    name: "Trà Xanh Matcha",
    price: 450000,
    size: "200g",
    brand: "phuc-long",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400&h=400&fit=crop",
  },
  {
    id: 15,
    name: "Trà Ô Long Truyền Thống",
    price: 340000,
    size: "100g",
    brand: "tea4life",
    region: "lam-dong",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
  },
  {
    id: 16,
    name: "Trà Sen Thanh Mát",
    price: 380000,
    size: "200g",
    brand: "highlands",
    region: "tay-ho",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop",
  },
  {
    id: 17,
    name: "Trà Ô Long Hảo Hạng",
    price: 520000,
    size: "500g",
    brand: "tea4life",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
  },
  {
    id: 18,
    name: "Trà Xanh Organic",
    price: 360000,
    size: "100g",
    brand: "cozy",
    region: "moc-chau",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
  {
    id: 19,
    name: "Trà Đen Earl Grey",
    price: 310000,
    size: "100g",
    brand: "highlands",
    region: "thai-nguyen",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop",
  },
  {
    id: 20,
    name: "Trà Thảo Mộc An Thần",
    price: 280000,
    size: "50g",
    brand: "phuc-long",
    region: "ha-giang",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop",
  },
];
