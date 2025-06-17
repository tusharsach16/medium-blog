import Auth from "../components/Auth"
import Quote from "../components/Quote"

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="invisible md:visible">
        <Quote/>
      </div>

      <div>
        <Auth type="signin"/>
      </div>
      
    </div>
  )
}

export default Signup