import HomeHeader from "../../layouts/header/HomeHeader";
import HomeMain from "../../assets/images/home-image.jpg"
import HomeFooter from "../../layouts/footer/HomeFooter";
import EventsLoader from "../../components/common/EventLoader";
import Helmet from 'react-helmet';

const HomePage = () => {
  return (
    <>
    <Helmet>
      <title>Home - Employee Portal</title>
    </Helmet>
      <HomeHeader />
      <div>
        <img src={HomeMain} alt="Dashboard-Head-Image" width="100%" height="50%" className="shadow " />
      </div>
      <div className="row align-items-md-stretch px-5 my-3 mx-0">
        <div className="col-md-6">
          <div className="h-100 p-5 bg-info border rounded-3 shadow">
            <p className="text-center h4 text-white">We are more than a company, we are a family!
              We are a diverse yet close-knit group of people united by a passion for technology
              At IncubXperts, we believe in working hard, playing harder, and drinking a whole lot of tea (and coffee)!</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3 shadow">
            <h2>Join The Team Of Experts</h2>
            <pre className="text-start text-black">{`
If you believe you have talent, challenge it here
If you believe you have a dream, realize it here
If you believe you can fly, grow your wings here
`}</pre>
            <p>
              Talk to us to know how you can chart your growth at IncubXperts
            </p>
          </div>
        </div>
      </div>
      <HomeFooter />  
    </>
  );
}

export default HomePage;