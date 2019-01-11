/**
 * Created by vladtomsa on 10/01/2019
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class AddressDetails extends Component {
    render() {
        return (
            <div>
                <h1>Address details</h1>

                <Link to="/">
                    Go back
                </Link>
            </div>
        );
    }

    componentDidMount() {
        const { match: { params: { address } } } = this.props;
        console.log(this.props);
    }
}

export default AddressDetails;