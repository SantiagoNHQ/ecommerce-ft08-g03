import ProductCards from '../ProductCards/ProductCards'
import './Home.css'
import axios from 'axios'

export default function Home() {
    return (
        <div>
            <header className='header'>
                <section className="textos-header">
                    <h1>We<span>Are</span>Wine</h1>
                    <h2>Vinos <span>Nacionales</span> e <span>Internacionales</span></h2>
                </section>
            {/* <div style={({ height: "150px" }, { overflow: "hidden" })}>
                <svg
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                style={({ height: "100%" }, { width: "100%" })}
                >
                <path
                    d="M-20.04,-25.34 C100.16,251.92 303.88,-23.36 552.76,74.31 L500.00,149.98 L0.00,149.98 Z"
                    style={({ stroke: "none" }, { fill: "#08f" })}
                ></path>
                </svg>
            </div> */}
            </header>
            <ProductCards data={axios.get(`http://localhost:3001/product`)} />
        </div>
    )
}