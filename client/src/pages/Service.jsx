import { useAuth } from "../store/auth";

export const Service = () => {
    const { service } = useAuth();
    console.log(service);

    // Check if service is defined and is an array
    if (!Array.isArray(service)) {
        return (
            <section className="section-services">
                <div className="container">
                    <h1 className="main-heading">Services</h1>
                    <p>No services available.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-three-cols">
                {service.map((curr, index) => (
                    <div className="card" key={index}>
                        <div className="card-details">
                            <div className="grid grid-two-cols">
                                <p>{curr.provider}</p>
                                <p>{curr.price}</p>
                            </div>
                            <h2>{curr.service}</h2>
                            <p>{curr.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
