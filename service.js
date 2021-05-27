const { Client } = require('pg');
const config = require('./utils/config')
class service {

    async dbConnect() {
          const client = new Client({
            host: config.POSTGRES.HOST,
            database: config.POSTGRES.DB,
            port: config.POSTGRES.PORT,
        });
        try{
            await client.connect();
            console.log("connected to db")
            return client;
        } catch(err) {
            throw err; 
        }
    }
    
    async createTable() {
        const query = 'CREATE TABLE IF NOT EXISTS COMPANY( ID INT PRIMARY KEY, NAME TEXT, AGE INT, ADDRESS CHAR(50), SALARY REAL)'
        const client = await this.dbConnect();
        try {
            const res = await client.query(query);
            console.log('Table is successfully created');
            await client.end()
        } catch (err) {
            throw err
        } 
    }

    async createUser(data) {
        const query = "INSERT INTO COMPANY(ID, NAME, AGE, ADDRESS, SALARY) VALUES(" + data.id+" , '"+ data.name +"' ,"+ data.age+ ", '" +data.address + "' ,"+data.salary + ")"
        try {
            const client = await this.dbConnect();
            const res = await client.query(query);
            console.log('Data is successfully inserted');
            await client.end()
            return 
        } catch (err) {
            throw err
        } 
    }

    async getUser(id) {
        let query = "SELECT * FROM COMPANY"
        if(id) {
            query = query + " WHERE ID='" + id + "'"; 
        }
        try{
            const client = await this.dbConnect();
            const res = await client.query(query);
            return res.rows
        } catch(err) {
            throw err
        }
    }

    async updateUser(userData) {
        const id = userData.id;
        delete userData.id;
        const query = "UPDATE COMPANY SET "+ Object.keys(userData).map(key => key +"='"+userData[key]+"'").join(", ") + ` WHERE id = ${id}`
        try {
            const client = await this.dbConnect();
            await client.query(query);
            return
        }catch(err) {
            throw err
        }

    }
}

module.exports = service;