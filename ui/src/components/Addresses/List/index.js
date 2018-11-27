/**
 * Created by vladtomsa on 26/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const AddressList = ({ addressInfoList, onSelect }) => {
  return (
    <List
      subheader={(
        <ListSubheader component="div">Addresses</ListSubheader>
      )}
    >
      {
        addressInfoList.map((address, index) => {
          return (
            <ListItem
              key={address.name}
              onClick={() => onSelect(address)}
              divider={index !== addressInfoList.length - 1}
              button
            >
              <ListItemText
                primary={address.name}
              />
            </ListItem>
          );
        })
      }
    </List>
  )
};

AddressList.propTypes = {
  addressInfoList: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default AddressList;
