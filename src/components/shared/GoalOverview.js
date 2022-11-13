import { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from "src/components/Charts/DonatChart"
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import { HelpCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const GoalOverview = props => {
    const { data } = props;

    return (
        <Card>
            <CardBody className='p-0'>
                <Chart data={data} dataKey="count" nameKey="name" className="w-50" />
            </CardBody>
            <Row className='border-top text-center mx-0'>
                {data?.map(c => <Col xs='6' className='border-right py-1'>
                    <CardText className='text-muted mb-0'>{c.name}</CardText>
                    <h3 className='font-weight-bolder mb-0'>{c.count}</h3>
                </Col>)}
            </Row>
        </Card>
    )
}
export default GoalOverview
