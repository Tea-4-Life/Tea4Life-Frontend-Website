// Filter options
export const brands = [
  { value: "all", label: "Tất cả" },
  { value: "tea4life", label: "Tea4Life" },
  { value: "gong-cha", label: "Gong Cha" },
  { value: "phuc-long", label: "Phúc Long" },
  { value: "tocotoco", label: "TocoToco" },
];

export const regions = [
  { value: "all", label: "Tất cả" },
  { value: "tra-sua", label: "Trà sữa" },
  { value: "tra-trai-cay", label: "Trà trái cây" },
  { value: "macchiato", label: "Macchiato" },
  { value: "sua-tuoi", label: "Sữa tươi" },
  { value: "ca-phe", label: "Cà phê" },
];

export const sizes = [
  { value: "all", label: "Tất cả" },
  { value: "S", label: "Size S" },
  { value: "M", label: "Size M" },
  { value: "L", label: "Size L" },
];

export const categories = [
  {
    value: "tra-sua",
    label: "Trà Sữa",
    description: "Ngọt ngào béo ngậy, thức uống vạn người mê.",
    icon: "Coffee",
  },
  {
    value: "tra-trai-cay",
    label: "Trà Trái Cây",
    description: "Thanh mát giải nhiệt, đánh tan cơn khát.",
    icon: "Sprout",
  },
  {
    value: "sua-tuoi",
    label: "Sữa Tươi",
    description: "Dòng sữa thanh trùng tươi mới mỗi ngày.",
    icon: "Flower2",
  },
  {
    value: "macchiato",
    label: "Macchiato",
    description: "Lớp kem mặn ngọt hòa quyện cùng cốt trà.",
    icon: "Leaf",
  },
];

// Mock products data
export const allProducts = [
  {
    id: 1,
    name: "Trà Sữa Trân Châu Koko",
    price: 45000,
    size: "M",
    brand: "tea4life",
    region: "tra-sua",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1558852063-8a39e8027a05?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Hồng Trà Macchiato",
    price: 55000,
    size: "L",
    brand: "tea4life",
    region: "macchiato",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1623868612984-633dfbaf0fbb?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Trà Đào Cam Sả",
    price: 50000,
    size: "M",
    brand: "tea4life",
    region: "tra-trai-cay",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1498644349942-5b966cf1375d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Sữa Tươi Trân Châu Đường Đen",
    price: 60000,
    size: "L",
    brand: "gong-cha",
    region: "sua-tuoi",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Trà Xanh Sữa",
    price: 40000,
    size: "M",
    brand: "phuc-long",
    region: "tra-sua",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Trà Vải Nhiệt Đới",
    price: 45000,
    size: "L",
    brand: "tocotoco",
    region: "tra-trai-cay",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1524156868115-e696b44983db?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Trà Sữa Khoai Môn",
    price: 50000,
    size: "M",
    brand: "gong-cha",
    region: "tra-sua",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1606758688404-58bc4499d30c?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Lục Trà Macchiato",
    price: 45000,
    size: "M",
    brand: "tea4life",
    region: "macchiato",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1623868612984-633dfbaf0fbb?w=400&h=400&fit=crop",
  },
];
