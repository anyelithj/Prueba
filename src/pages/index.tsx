import HistoryModal from "@/components/HistoryModal";
import Layout from "@/components/Layout";
import SearchBox from "@/components/SearchBox";
import WordMeaning from "@/components/WordMeaning";


const Home = () => (
  <Layout>
    <SearchBox />
    <HistoryModal />
    <WordMeaning />
  </Layout>
);

export default Home;
