'use strict';
var loopback = require('loopback');
module.exports = function(Workload) {
    var ContactSchema  = {
        contact_ID:{
                type: Number,
                required: true
        },
        First:{
                type: String,
                required: true
        },
        Last:{
                type: String,
                required: true
        },
        email:{
                type: String,
                required: true
        },
        company:{
                type: String,
                required: true
        },
        phone_number:{
                type: String,
                required: true
        }
     };

     var KeywordSchema = {
        word:{
             type: String,
             required: false
        } 
     };
 
    var CaseSchema = {
    case_number:{
        type: Number,
        required: true
    },
    contacts: [ ContactSchema ],
    case_type: {
        type: Number,
        min: 0,
        required: true
    },
    case_purpose: {
        type: String,
        default: 'pre',
        required: false
    },
    subject: {
        type: String,
        required: true
    },
    product_line: {
        type: String,
        required: true
    },
    keywords: [ KeywordSchema ],
    Archive: {
        type: Boolean,
        default: false,
        required: true 
    }
    };

    var WorkLoad = loopback.Model.extend('work-load', CaseSchema);
    WorkLoad.observe('before save', function(context, next) {
        //check the context.req object for incoming object.
        //otherwise, search in context object.
        console.log(context.req);
        var reqObject = context.req;

        //get keys of productSchema
        var allowedFields = Object.keys(caseSchema);

       //Iterate incoming object and delete extra fields
       //Using delete reqObject.extraField. if not matched to keys in allowedFields.
    });

};
