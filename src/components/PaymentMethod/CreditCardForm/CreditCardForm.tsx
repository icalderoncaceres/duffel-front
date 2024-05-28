
import './CreditCardForm.css';
function CreditCardForm() {
    return (
        <div className="padding" >
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <strong>Introduzca el detalle de su tarjeta de crédito o débito</strong>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name"><b>Nombre</b></label>
                                        <input className="form-control" id="name" type="text" placeholder="Ingrese su nombre" />
                                    </div>
                                </div>
                            </div>
                        
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name"><b>Dirección</b></label>
                                        <input className="form-control" id="address" type="text" placeholder="Ingrese su dirección" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="ccnumber"><b>Número de la tarjeta</b></label>

                                        <div className="input-group">
                                            <input className="form-control" type="text" placeholder="0000 0000 0000 0000" autoComplete="email" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="bi bi-credit-card"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="ccmonth"><b>Mes de vencimiento</b></label>
                                    <select className="form-control" id="ccmonth">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="ccyear"><b>Año de vencimiento</b></label>
                                    <select className="form-control" id="ccyear">
                                        <option>2025</option>
                                        <option>2026</option>
                                        <option>2027</option>
                                        <option>2028</option>
                                        <option>2029</option>
                                        <option>2030</option>
                                        <option>2031</option>
                                        <option>2032</option>
                                        <option>2033</option>
                                        <option>2034</option>
                                        <option>2035</option>
                                        <option>2036</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="cvv"><b>CVV/CVC</b></label>
                                        <input className="form-control" id="cvv" type="text" placeholder="123" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button className="btn btn-sm btn-success float-right" type="submit">
                                <i className="mdi mdi-gamepad-circle"></i> Continuar</button>
                            <button className="btn btn-sm btn-danger" type="reset">
                                <i className="mdi mdi-lock-reset ml-2"></i> Limpiar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CreditCardForm;