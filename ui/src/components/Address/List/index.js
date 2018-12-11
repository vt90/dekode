import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EnhancedTable = ({
                           addresses,
                           isVerified,
                           verifyAddress
                       }) => {
    if (!addresses) return null;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell variant={"head"}>
                        address
                    </TableCell>
                    <TableCell variant={"head"}>
                        status
                    </TableCell>
                    <TableCell variant={"head"}>
                        isVerified
                    </TableCell>
                    {!isVerified &&
                    <TableCell variant={"head"}>
                    </TableCell>
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {addresses.map(address => {
                    return (
                        <TableRow key={address._id}>
                            <TableCell variant={"body"}>
                                {address.address}
                            </TableCell>
                            <TableCell variant={"body"}>
                                {address.status}
                            </TableCell>
                            <TableCell variant={"body"}>
                                {address.isVerified.toString()}
                            </TableCell>
                            {!isVerified &&
                            <TableCell
                                className={"clickable"}
                                variant={"body"}
                                onClick={verifyAddress}
                                data-id={`${address._id}`}
                            >
                                verify address
                            </TableCell>
                            }
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
};

export default EnhancedTable;
