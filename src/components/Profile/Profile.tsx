import React, { useEffect, useState } from 'react';
import ProfileField from '../ProfileField/ProfileField';
import './Profile.scss';
import ProfileAddress from '../ProfileAddress.tsx/ProfileAddress';
import { Button } from '../Button/Button';
import Label from '../Label/Label';
import getCustomer from '../../api/getCustomer';
import {
  updateCustomerEmail,
  updateCustomerName,
  updateCustomerLastName,
  updateCustomerDateBirth,
} from '../../api/updateCustomer';

const Profile = (): JSX.Element => {
  const [isDisabledFirstName, setDisabledFirstName] = useState(true);
  const [isDisabledLastName, setDisabledLastName] = useState(true);
  const [isDisabledDateBirth, setDisabledDateBirth] = useState(true);
  const [isDisabledEmail, setDisabledEmail] = useState(true);
  const [isOpen, setOpen] = useState(true);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerDateBirth, setCustomerDateBirth] = useState('');
  const [customerCurrentPasword, setCustomerCurrentPassword] = useState('');
  const [customerNewPassword, setCustomerNewPassword] = useState('');
  const [customerShippingCode, setCustomerShippingCode] = useState('');
  const [customerShippingCountry, setCustomerShippingCountry] = useState('');
  const [customerShippingCity, setCustomerShippingCity] = useState('');
  const [customerShippingStreet, setCustomerShippingStreet] = useState('');
  const [customerBillingCode, setCustomerBillingCode] = useState('');
  const [customerBillingCountry, setCustomerBillingCountry] = useState('');
  const [customerBillingCity, setCustomerBillingCity] = useState('');
  const [customerBillingStreet, setCustomerBillingStreet] = useState('');
  const [version, setVersion] = useState(1);

  const clickChangePassword = (): void => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    getCustomer().then((obj) => {
      setCustomerEmail(obj.body.email);
      setCustomerFirstName(obj.body.firstName as string);
      setCustomerLastName(obj.body.lastName as string);
      setCustomerDateBirth(obj.body.dateOfBirth as string);
      setCustomerShippingCode(obj.body.addresses[0].postalCode as string);
      setCustomerShippingCountry(obj.body.addresses[0].country as string);
      setCustomerShippingCity(obj.body.addresses[0].city as string);
      setCustomerShippingCity(obj.body.addresses[0].streetName as string);
      if (obj.body.addresses[1]) {
        setCustomerBillingCode(obj.body.addresses[0].postalCode as string);
        setCustomerBillingCountry(obj.body.addresses[0].country as string);
        setCustomerBillingCity(obj.body.addresses[0].city as string);
        setCustomerBillingCity(obj.body.addresses[0].streetName as string);
      }
      setVersion(obj.body.version);
    });
  }, []);

  const setNewFirstName = (): void => {
    if (customerFirstName.length === 0) {
      setCustomerFirstName(customerFirstName);
    }
    updateCustomerName(customerFirstName, version).then((resp) => {
      setCustomerFirstName(resp.body.firstName);
      setVersion(resp.body.version);
    });
  };
  const setNewLastName = (): void => {
    if (customerLastName.length === 0) {
      setCustomerLastName(customerLastName);
    }
    updateCustomerLastName(customerLastName, version).then((resp) => {
      setCustomerLastName(resp.body.lastName);
      setVersion(resp.body.version);
    });
  };
  const setNewEmail = (): void => {
    if (customerEmail.length === 0) {
      setCustomerEmail(customerEmail);
    }
    updateCustomerEmail(customerEmail, version).then((resp) => {
      setCustomerEmail(resp.body.email);
      setVersion(resp.body.version);
    });
  };
  const setNewDate = (): void => {
    if (customerDateBirth.length === 0) {
      setCustomerDateBirth(customerDateBirth);
    }
    updateCustomerDateBirth(customerDateBirth, version).then((resp) => {
      setCustomerDateBirth(resp.body.dateOfBirth);
      setVersion(resp.body.version);
    });
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Profile</h2>
      <ProfileField
        text="Email"
        id="email"
        value={customerEmail}
        isDisabled={isDisabledEmail}
        setDisabled={setDisabledEmail}
        clickSave={setNewEmail}
        setRequestInfo={setCustomerEmail}
      />
      <ProfileField
        text="First name"
        id="first-name"
        value={customerFirstName}
        isDisabled={isDisabledFirstName}
        setDisabled={setDisabledFirstName}
        setRequestInfo={setCustomerFirstName}
        clickSave={setNewFirstName}
      />
      <ProfileField
        text="Last name"
        id="last-name"
        value={customerLastName}
        isDisabled={isDisabledLastName}
        setDisabled={setDisabledLastName}
        setRequestInfo={setCustomerLastName}
        clickSave={setNewLastName}
      />
      <ProfileField
        text="Date of birth"
        id="date-birth"
        value={customerDateBirth}
        isDisabled={isDisabledDateBirth}
        setDisabled={setDisabledDateBirth}
        setRequestInfo={setCustomerDateBirth}
        clickSave={setNewDate}
      />
      <h3 className="profile__address-title">Shipping address</h3>
      <ProfileAddress
        typeAddress="shipping"
        setCode={setCustomerShippingCode}
        setCity={setCustomerShippingCity}
        setCountry={setCustomerShippingCountry}
        setStreet={setCustomerShippingStreet}
        customerCode={customerShippingCode}
        customerCity={customerShippingCity}
        customerCountry={customerShippingCountry}
        customerStreet={customerShippingStreet}
      />
      <h3 className="profile__address-title">Billing address</h3>
      <ProfileAddress
        typeAddress="billing"
        setCode={setCustomerBillingCode}
        setCountry={setCustomerBillingCountry}
        setCity={setCustomerBillingCity}
        setStreet={setCustomerBillingStreet}
        customerCode={customerBillingCode}
        customerCity={customerBillingCity}
        customerCountry={customerBillingCountry}
        customerStreet={customerBillingStreet}
      />
      <Button
        className="button-change"
        textContent="Change password"
        type="button"
        onClick={clickChangePassword}
      />
      <div
        className={
          isOpen ? 'profile__change-password' : 'profile__change-password open'
        }
      >
        <Label
          text="Current password"
          id="current-password"
          value={customerCurrentPasword}
          isDisabled={false}
          type="password"
          setRequestInfo={setCustomerCurrentPassword}
        />
        <Label
          text="New password"
          id="new-password"
          value={customerNewPassword}
          isDisabled={false}
          type="password"
          setRequestInfo={setCustomerNewPassword}
        />
        <Button
          className="button-save__password"
          textContent="Save password"
          type="button"
        />
      </div>
    </div>
  );
};

export default Profile;
