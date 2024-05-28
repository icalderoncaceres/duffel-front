import forbidden from '../assets/images/forbidden.jpeg';

function Forbidden() {
    const sendPMFinish = () => {
        window.parent.postMessage({ key: 'PM_FINISH', value: true }, '*');
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-12">
                    <h1 className="text-center font-weight-bold shadow">
                        Uff! Se presentó un error, verifique la información y vuelva a intentarlo. 
                    </h1>
                    <hr />
                </div>
                <div className="col-12 col-md-12">
                    <img src={forbidden} alt="Error" className="img-fluid" />
                </div>
                <div className="col-12 col-md-3"></div>
                <div className="col-12 col-md-6 mt-4">
                    <button className="btn btn-primary btn-lg d-block w-100" onClick={sendPMFinish}>Volver</button>
                </div>
                <div className="col-12 col-md-3"></div>
            </div>
        </div>
    )
}

export default Forbidden;
