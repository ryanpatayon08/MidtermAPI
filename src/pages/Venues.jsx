import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Venues = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(()=> {
            fetch("https://sis.materdeicollege.com/api/venues")
            .then((res) => {
                if(!res.ok){
                    throw Error('Failed to fetch');
                }
                return res.json()
        })
            .then((data) => {
                const { venues } = data;
                setData(venues);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
                setData(false);
            })
        },1000)
    }, []);

    const handleOpenVenue = (venue) => {
        navigate(`/venues/${venue}`);
      };
     
    return ( 
        <div className="venues">
            {/* {JSON.stringify(data)} */}
            <div className="card bg-info">
                <div className="card-header bg-success text-light">
                    <h1>Venues</h1>
                </div>

               
                <div className="card-body" style={{
                    height:"50vh",
                    overflow:"auto"
                }}>
                <table className="table table-striped">
                    <thead  className="bg-info">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Building</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {Object.keys(data)?.map((venue, index) => {
                        return (
                        <tr key={index}>
                            <td>{data[venue].id}</td>
                            <td>{data[venue].name}</td>
                            <td>{data[venue].building}</td>
                            <td>{data[venue].capacity}</td>
                            <td><a className="btn btn-light" onClick={() => {
                                handleOpenVenue(data[venue].id);}}>
                                Open Schedule</a></td>
                                
                        </tr>
                        );
                    })}
                    </tbody>
                </table>

                { error && 
                  <div className="text-danger">
                  <strong>{error}</strong>
                  </div>
                }
                { isPending && 
                <div className="text-success">
                    <strong>Loading....</strong> 
                </div>
                }
                </div>
            </div>
        </div>
     );
}
 
export default Venues;