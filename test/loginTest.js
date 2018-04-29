/**
@author: Shraddha Kharat
@Version: 1.0.2
@Date: 17/01/2018
@description: DOIT BlockChain project
**/

'use strict';

const express = require('express');
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app');

const router = express.Router();
require('../routes')(router);
app.use('/', router);
var mlog = require('mocha-logger')
var empty = require('is-empty');
var assert = require('assert');
var should = require("should");

var sinon = require('sinon');
var http = require('http');
var request = require("supertest");

var config = require('config');
var TestIp = config.get('TestIp');
var api = request("http://" + TestIp.host + ":3000")


/***     test case for login details    ***/
describe('login', function() {
    it("should add login data into blockchain", function(done) {

        /*** calling login api ***/
        request(app)
        api
            .post('/getEHRID')
            .send({
                "SSO_ID": "ss012",
                "DOB": "11/11/1994",
                "BHAMASHAHID": "bmsh123",
                "MEMBER_ID": "0023",
                "NAME_ENGLISH":"risabh",
                "FATHERS_NAME_ENGLISH": "risabh",
                "MOTHERS_NAME_ENGLISH": "risabh",
                "SPOUSE_NAME_ENGLISH": "risabh",
                "AADHARNO": "1234456789",
                "EMAIL": "rpqb@rp",
                "MOBILENO": "8169226823",
                "GENDER": "male",
                "ACK_ID": "23313452313",
                "PHOTO": "www.google.com",
                "NAME_HINDI": "रिषभ",
                "FATHERS_NAME_HINDI": "रिषभ",
                "MOTHERS_NAME_HINDI": "रिषभ",
                "SPOUSE_NAME_HINDI": "रिषभ",
                "PASSPORT": "e2342eed",
                "BANK_NAME": "fdtredrsf",
                "ACCOUNT": "12345645",
                "PAN_NO": "233242eeffe",
                "VOTER_ID": "null",
                "DRIVING_LIENCE_NO": "bbwklain10099",
                "QUALITFICATION": "BE",
                "IS_EHR_USER": "Y",
                "IS_APPROVED_IHMS_USER": "N",
                "IS_PROVIDER": "N",
                "IS_APPROVED_PROVIDER": "N",
                "IS_ACTIVE": "A"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property("SSO_ID");
                res.body.should.have.property('DOB');
                res.body.should.have.property('BHAMASHAHID');
                res.body.should.have.property('MEMBER_ID');
                res.body.should.have.property('NAME_ENGLISH');
                res.body.should.have.property('FATHERS_NAME_ENGLISH');
                res.body.should.have.property('MOTHERS_NAME_ENGLISH');
                res.body.should.have.property('SPOUSE_NAME_ENGLISH');
                res.body.should.have.property('AADHARNO');
                res.body.should.have.property('EMAIL');
                res.body.should.have.property('MOBILENO');
                res.body.should.have.property('GENDER');
                res.body.should.have.property('ACK_ID');
                res.body.should.have.property('PHOTO');
                res.body.should.have.property('NAME_HINDI');
                res.body.should.have.property('FATHERS_NAME_HINDI');
                res.body.should.have.property('MOTHERS_NAME_HINDI');
                res.body.should.have.property('SPOUSE_NAME_HINDI');
                res.body.should.have.property('PASSPORT');
                res.body.should.have.property('BANK_NAME');
                res.body.should.have.property('ACCOUNT');
                res.body.should.have.property('PAN_NO');
                res.body.should.have.property('VOTER_ID');
                res.body.should.have.property('DRIVING_LIENCE_NO');
                res.body.should.have.property('QUALITFICATION');
                res.body.should.have.property('IS_EHR_USER');
                res.body.should.have.property('IS_APPROVED_IHMS_USER');
                res.body.should.have.property('IS_PROVIDER');
                res.body.should.have.property('IS_APPROVED_PROVIDER');
                res.body.should.have.property('IS_ACTIVE');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });
    it("Should add login data without ssoid into blockchain", function(done) {

        /*** calling login api ***/
        request(app)
        api .post('/getEHRID')
            .send({  
                "BHAMASHAHID": "ss233",
                "MEMBER_ID": "12345"                       
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                    
                res.body.should.have.property('BHAMASHAHID');
                res.body.should.have.property('MEMBER_ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });
    it("Fields should not be empty during login", function(done) {

        /*** calling login api ***/
        request(app)
        api .post('/getEHRID')
            .send({
        "SSO_ID": "SSO_ID",
        "DOB": "DOB",
        "BHAMASHAHID": "",
        "MEMBER_ID": "123001",
        "NAME_ENGLISH": "hjkk",
        "FATHERS_NAME_ENGLISH": "testarun",
        "MOTHERS_NAME_ENGLISH":  "testrishbh",
        "SPOUSE_NAME_ENGLISH":  "testrakesh",
        "AADHARNO":  "hjkk",
        "EMAIL":  "hjkk",
        "MOBILENO":  "909090900",
        "GENDER":  "M",
        "ACK_ID": "",
        "PHOTO": "a.jpg",
        "ADDRESS": "ADDRESS",
        "NAME_HINDI": "NAME_HINDI",
        "FATHERS_NAME_HINDI":"राकेश",
        "MOTHERS_NAME_HINDI": "राकेश",
        "SPOUSE_NAME_HINDI": "राकेशराकेश",
        "PASSPORT": "",
        "BANK_NAME": "BANK_NAME",
        "ACCOUNT": "",
        "PAN_NO": "hjj",
        "VOTER_ID": "7y7y",
        "DRIVING_LIENCE_NO": "909066",
        "QUALITFICATION":"be56",
        "IS_EHR_USER": "Y",
        "IS_APPROVED_IHMS_USER": "N",
        "IS_PROVIDER": "N",
        "IS_APPROVED_PROVIDER": "N",
        "IS_ACTIVE": "A"
    })
    .set("Accept", 'application/json')
    .expect(400)
    .end(function(err, res) {
            
        res.body.should.have.property('BHAMASHAHID');
        res.body.should.have.property('MEMBER_ID');
        res.status.should.equal(200);
        res.body.data.should.equal(result.message);
    });
done();
});
  
})