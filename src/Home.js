import {React, useState} from "react";
import {
    Button, 
    Text,
    Input,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Select,
    Box
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import SketchCanvas from "./Sketch";

let nextId = 0

const Home = (props) => {
  const[arr, setArr] = useState([])
  const[amplitude, setAmplitude] = useState('')
  const[period, setPeriod] = useState('')
  const[status, setStatus] = useState('+')
  const[isButtonDisabled, setIsButtonDisabled] = useState(true)

  return (
    <div className='App'>
      <header className='App-header'>
        <Text>진폭:</Text>
        <Input
          value = {amplitude}
          onChange = {e => setAmplitude(e.target.value)}
          placeholder = '10~30'
          size='sm'
        ></Input>
        <Text>주기:</Text>
        <Input
          value = {period}
          onChange = {e => setPeriod(e.target.value)}
          placeholder = '100~300'
          size='sm'
        ></Input>
        <Box height='10px'/>
        <Select 
          placeholder='select wave'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value='+'>+</option>
          <option value='-'>-(+와 반대위상)</option>
        </Select>
        <Box height='10px'/>
        <Button colorScheme='blue' onClick={() => {
          nextId++
          setArr([
            ...arr,
            {id: nextId, amplitude: parseInt(amplitude), period: parseInt(period), status:  String(status) }
          ])
          setIsButtonDisabled(false)
        }}>파동 추가</Button>
        <Box height='10px'/>
          <ul>
            {
              arr.map(item => {
                return <Card key={item.id}>
                  <CardHeader>
                    <Heading>
                      <Text>{item.status}파</Text>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>진폭 = {item.amplitude}</Text>
                    <Text>주기 = {item.period}</Text>
                  </CardBody>
                </Card>
              })
            }
          </ul>
          <Link to={`/waves`} state={{arr: {arr}}} element={<SketchCanvas/>}><Button colorScheme={'blue'} isDisabled = {isButtonDisabled}>입력완료</Button></Link>
      </header>
    </div>
  )
}

export default Home