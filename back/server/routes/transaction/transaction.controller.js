const pool = require('../../db');

const txSend = async (req, res) => {
    // 코인 보내고(tx db에 넣고) 보유 수량 줄이기

    console.log('txSend : ' + req.body.data)

    try {
        console.log('txSend Try : ' + req.body.data)
        await pool.query(`INSERT INTO tx(txFrom, txTo, txAmount) VALUES('${req.body.publicKey}', '${req.body.data}', '${req.body.amount}');`)
        await pool.query(`UPDATE wallet SET walletAmount = walletAmount - ${req.body.amount} WHERE publicKey='${req.body.publicKey}';`)
        await pool.query(`UPDATE wallet SET walletAmount = walletAmount + ${req.body.amount} WHERE publicKey='${req.body.data}';`)
        res.send('send 성공이다!!!!!!!!!!!!!')
    } catch (error) {
        console.log(error)
    }
};

const txRead = async (req, res) => {
    // 거래 다 읽어오기
    const [result] = await pool.query(`SELECT * FROM tx WHERE (txFrom='${req.body.data}' OR txTo='${req.body.data}');`)
    console.log("txRead : " + result)
    res.json(result)
};

module.exports = {
    txSend,
    txRead,
}