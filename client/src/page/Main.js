import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from 'react-bootstrap'
import { DataPost } from '../components'

const Main = () => {

    const [getBlock ,setGetBlock] = useState(null)
    const [test, setTest] = useState(0)

    const getGetBlockFunc =  async () => {
        console.log('이거 가냐?')
        try {
            const blocks = await axios.get('http://localhost:3500/block/getblock')
            console.log('blocks : ', blocks)
            console.log('전체데이터 : ', blocks.data) // 요게 배열
            console.log('배열의 특정 인덱스 : ', blocks.data[0]) // 그 인덱스 값을 다 돌리면 되겠지? 
            console.log('블록해쉬 : ', blocks.data[0].hash) // 그 인덱스 값을 다 돌리면 되겠지? 
            console.log('블록해쉬타입 : ', typeof(blocks.data[0].hash))  
            console.log('스트링앞짜르기 : ', (blocks.data[0].hash).substr(0, 5)) 
            console.log('스트링뒤짜르기 : ', (blocks.data[0].hash).slice(-5))  

            setGetBlock(blocks.data.reverse()) 
            console.log(getBlock)

        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect( () => {
        getGetBlockFunc()
    },[test])

    return (
        <>
            <h2>블록 가져오기!!!</h2>

            <Table striped bordered hover size="sm" className="mainTable">
                <thead>
                <tr>
                    <th>BLOCK#</th>
                    <th>Data</th>
                    <th>Timestamp</th>
                    <th>Hash</th>
                    <th>PreviousHash</th>
                    <th>Difficulty</th>
                    <th>Nonce</th>
                </tr>
                </thead>
                <tbody>
                {
                    getBlock === null 
                    ? false 
                    :
                    getBlock.map( (number, index) => {
                        return <tr key={index}>
                            <td>{number.blockIndex}</td>
                            <td>{number.data}</td>
                            <td>{number.timestamp}</td>
                            <td>{(number.hash).substr(0, 6)}...{(number.hash).slice(-6)}</td>
                            <td>{(number.previousHash).substr(0, 6)}...{(number.previousHash).slice(-6)}</td>
                            <td>{number.difficulty}</td>
                            <td>{number.nonce}</td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
            <DataPost test={test} setTest={setTest}/>

        </>
    )
}

export default Main;