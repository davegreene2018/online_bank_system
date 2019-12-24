/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.models;

import java.util.Date;

/**
 *
 * @author Daveg
 */
public class Transaction {
    
    private int transId;
    //transType include: debit,credit
    private String transType;
    //private Date TransCreated;
    private Date date;
    private String desc;
    private double postBalance;

    public Transaction() {
    }

    public Transaction(int transId, String transType, Date date, String desc, double postBalance) {
        this.transId = transId;
        this.transType = transType;
        this.date = date;
        this.desc = desc;
        this.postBalance = postBalance;
    }

    public Transaction(int transId, String transType, String desc, double postBalance) {
        this.transId = transId;
        this.transType = transType;
        this.desc = desc;
        this.postBalance = postBalance;
    }

    public int getTransId() {
        return transId;
    }

    public void setTransId(int transId) {
        this.transId = transId;
    }

    public String getTransType() {
        return transType;
    }

    public void setTransType(String transType) {
        this.transType = transType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public double getPostBalance() {
        return postBalance;
    }

    public void setPostBalance(double postBalance) {
        this.postBalance = postBalance;
    }
    
    
    
}
