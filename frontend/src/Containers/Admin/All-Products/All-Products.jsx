import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Table, Typography, Popconfirm, message, Button, Space } from 'antd';
import { getAllProducts, deleteOne } from '../../../redux/actions/products';
import { NavLink } from 'react-router-dom';
import './All-Products.scss'

const AllProducts = ({products}) => {
    useEffect(() => { getAllProducts(); }, []);
    const { Title } = Typography;

    const columns = [
        { title: 'Nombre', dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name), sortDirections: ['descend', 'ascend'],},
        { title: 'Descripción', dataIndex: 'description', 
            sorter: (a, b) => a.description.localeCompare(b.description), sortDirections: ['descend', 'ascend'],},
        { title: 'Precio', dataIndex: 'price', 
            sorter: (a, b) => a.price - b.price, sortDirections: ['descend', 'ascend'],},
        { title: 'Categoria', dataIndex: ['category', 'name'], 
          sorter: (a, b) => a.category?.name.localeCompare(b.category?.name), sortDirections: ['descend', 'ascend'],},
        { title: 'Action', key: 'action', 
            render: (record) => (
                <Space size="middle">
                    <NavLink to={{pathname:'/admin-products', data:record}} exact>
                        Editar
                    </NavLink>
                    <Popconfirm title="Estás seguro que quieres eliminar el producto?" okText="Si" cancelText="No"
                        onConfirm={confirm.bind(this, record._id)} onCancel={cancel}>
                        <button  type="button" className="link-button">
                            Eliminar
                        </button>
                    </Popconfirm>
                    
                </Space>),
        },
      ];

    function confirm(e) {
        deleteOne(e);
        message.success('Confirmado');
    }

    function cancel(e) {
        message.error('Cancelado');
    }

    return (
         <Row justify="center">
            <Col span={18} style={{marginTop: 40 }}>
                <Card className=" cardRegister animated bounceInRight" style={{ marginTop: 30, borderRadius: 10, backgroundColor: "#cccccc17", boxShadow: "1px 1px 3px #727272"}}>
                    <Row justify="center" style={{ marginBottom: 5}}>
                        <Col>
                            <Title level={2}> Productos </Title>
                            <Row>
                                <NavLink to='/admin-products' exact>
                                    <Button type="primary">
                                        Nuevo Producto
                                    </Button>
                                </NavLink>    
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Table columns={columns} dataSource={products} size="middle" />
                    </div>
                </Card>
            </Col>
         </Row>
    )
}

const mapStateToProps = ({product}) => ({products:product.products});
export default connect(mapStateToProps) (AllProducts);