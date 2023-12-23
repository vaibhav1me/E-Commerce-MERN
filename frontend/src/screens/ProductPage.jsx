import { useParams } from "react-router";
import { fetchProduct } from "../apis/api";

const ProductPage = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState("")
  useEffect(() => {
    const fetchData = async () => {
        let response = await fetchProduct(productId);

    }

  }, []);

  return (
    <div className="bg-[#a2b8cd]">
      <div className="header">
        <Header />
      </div>
      <section>

      </section>
    </div>
  );
};

export default ProductPage;
