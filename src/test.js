import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'


// Import component to be tested'
import LoginComponent from "Components/LoginComponent";

describe('Initial state', () => {
    it('has empty noRekening', () => {
        const wrapper = shallow(<LoginComponent />);
        expect(wrapper.state('noRekening')).to.equal(null);
    });

    it('has false in loggedIn', () => {
        const wrapper = shallow(<LoginComponent />);
        expect(wrapper.state('loggedIn')).to.equal(false);
    });
    it('has false in error', () => {
        const wrapper = shallow(<LoginComponent />);
        expect(wrapper.state('error')).to.equal(false);
    });
});

describe('Input change', () => {
    it('stores input', () => {
        const wrapper = mount(<LoginComponent />);
        const input = wrapper.find('input');
        input.simulate('change', {target: {value: '123'}});
        expect(wrapper.state('noRekening')).to.equal('123');
    });
});

describe('Handles responses', () =>{
    it('Declines invalid response', () =>{
        const wrapper = mount(<LoginComponent />)
        wrapper.instance().validateRekening(1234567)
        expect(wrapper.state('loggedIn')).to.equal(true)
    })
})