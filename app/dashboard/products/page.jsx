"use client";
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, ModalBody, ModalFooter, Modal, Button, ButtonGroup } from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2'
import { FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { withAuth } from "@/hoc/withAuth";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext"
import { BiLogOut } from "react-icons/bi";
const ProductsPage = () => {
    const { userStateAuth , getUserStateAuth} = useAuth()
    console.log("ressss", getUserStateAuth)
    const router = useRouter()
    const [response, setRes] = useState([])
    const [categories, setDataCat] = useState([])
    useEffect(() => {
        getProducts()
        getCategories()
    }, [])
    const getProducts = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`+'/products').then(res =>
            setRes(res.data)
        ).catch(err => console.log('er r get', err))
    }
    const getCategories = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`+'/products/categories').then(res => {
            setDataCat(res.data)
        }).catch(err => console.log('er r get', err))
    }

    const [modal_list_view, setmodal_list_view] = useState(false)
    const [modal_update, setmodal_update] = useState(false)
    const [modal_delete, setmodal_delete] = useState(false)
    const [modal_add, setmodal_add] = useState(false)
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [isPut, setIsPut] = useState(false);
    const [price, setPrice] = useState("")
    const [description, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState(null)
    function add_modal() {
        setTitle("")
        setDesc("")
        setPrice("")
        setImage(null)
        setmodal_add(!modal_add);
    }
    function viewModal(item) {
        setmodal_list_view(!modal_list_view)
        setTitle(item.title)
        setCategory(item.category)
        setPrice(item.price)
        setDesc(item.description)
        setImage(item.image)
    }
    function updateModal(item) {
        setId(item.id)
        setmodal_update(!modal_update)
        setTitle(item.title)
        setCategory(item.category)
        setPrice(item.price)
        setDesc(item.description)
        setImage(item.image)
        setIsPut(false)
    }
    function deleteModal(item) {
        setId(item.id)
        setmodal_delete(!modal_delete)

    }
    const handleChangeImage = (e) => {
        console.log('imaaaaage', e.target.files)
        setImage(e.target.files[0])

    }

    function updateProduct() {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}`+'/products/' + id, {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }).then(res => {
            console.log('success put op', res.data)
            setmodal_update(false)
            getProducts()
            return (Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Produit mis à jour avec succés',
                showConfirmButton: true,

            })
            )
        }
        ).catch(err => {
            console.log('err', err)
            return (Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Oops... Une erreur s'est produite, veuillez réessayer",
                showConfirmButton: true,

            })
            )
        })
    }
    function addProduct() {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}`+'/products', {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }).then(res => {
            console.log('success put op', res.data)
            setmodal_add(false)
            getProducts()
            return (Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Produit créé avec succés',
                showConfirmButton: true,

            })
            )
        }
        ).catch(err => {
            console.log('err', err)
            return (Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Oops... Une erreur s'est produite, veuillez réessayer",
                showConfirmButton: true,

            })
            )
        })
    }
    function deleteProduct() {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}`+'/products/' + id).then(res => {
            console.log('success delete op', res.data)
            setmodal_delete(false)
            getProducts()
            return (Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Produit supprimé avec succés',
                showConfirmButton: true,

            })
            )
        }
        ).catch(err => {
            console.log('err', err)
            return (Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Oops... Une erreur s'est produite, veuillez réessayer",
                showConfirmButton: true,

            })
            )
        })
    }
    const logout = () => {
        let userState = userStateAuth("")
        router.push("/login");
    }
    return (
        <div style={{
            padding: 30
        }}>
            <h4>Welcome to Dashboard</h4>
            <Button style={{
                float: "right"
            }} type='submit' color="light" onClick={() => logout()}><BiLogOut /> </Button>

            <Button type='submit' color="primary" onClick={() => add_modal()}> Créer</Button>
            <div className="table-responsive">
                <Table className="table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Prix</th>
                            <th>Catégorie</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.length ? response.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td><ButtonGroup>
                                    <Button style={{ backgroundColor: '#D32F2F' }} onClick={() => deleteModal(item)} >
                                        <FaTrashAlt />
                                    </Button>
                                    <Button style={{ backgroundColor: '#0277BD' }} icon="fa fa-trash" onClick={() => updateModal(item)} color="primary">
                                        <FaEdit />
                                    </Button>
                                    <Button style={{ backgroundColor: "#90A4AE" }} onClick={() => viewModal(item)}>
                                        <FaEye />
                                    </Button>
                                </ButtonGroup></td>
                            </tr>
                        }) : null
                        }
                    </tbody>
                </Table>
            </div>
            <Modal isOpen={modal_add} toggle={() => { add_modal(); }} centered >
                <div className="modal-header bg-light p-3">
                    <h5>Créer un nouveau produit</h5>
                    <Button type="button" onClick={() => { setmodal_add(false); }} className="btn-close" aria-label="Close" >
                    </Button>
                </div>
                <Form>
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">id</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>



                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titre</label>
                            <input type="text" id="title" className="form-control" placeholder='Titre' onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Prix</label>
                            <input type="text" id="price" className="form-control" placeholder='Prix' onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" id="description" className="form-control" placeholder='Description' onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="status-field" className="form-label">Catégorie</label>
                            <select onChange={(e) => setCategory(e.target.value)} className="form-control" data-trigger name="status-field" id="status-field" >
                                <option value="" readOnly>Select category</option>
                                {categories.map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image" className="form-label">Image</label>

                            <input className="form-control" type="file" id="formFile" onChange={(e) => handleChangeImage(e)} />
                        </div>
                        <br />




                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" id="closebtn" onClick={() => setmodal_add(false)}>Annuler</button>
                            <button type="button" className="btn btn-success" onClick={() => addProduct()} disabled={!(title && category && description && price)}
                            >Créer</button>
                        </div>
                    </ModalFooter>
                </Form>
            </Modal>
            {modal_update ? <>
                <Modal size="lg" isOpen={modal_update} toggle={() => { updateModal() }} centered >
                    <div className="modal-header">
                        <h5 className='modal-title'>Mettre à jour le produit</h5>
                        <Button type="button" onClick={() => { setmodal_update(false); }} className="btn-close" aria-label="Close" >
                        </Button>
                    </div>
                    <Form>
                        <ModalBody>
                            <div className="mb-3" id="modal-id-update" style={{ display: "none" }}>
                                <label htmlFor="id-field" className="form-label"> id</label>
                                <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                            </div>

                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label">Titre</label>
                                    <input type="text" id="customername-field" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label"> Prix</label>
                                    <input type="number" id="customername-field" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>


                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label"> Description</label>
                                    <textarea type="text" id="customername-field" className="form-control" value={description} onChange={(e) => setDesc(e.target.value)} />
                                </div>


                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label"> Catégorie</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" data-trigger name="status-field" id="status-field" >
                                        <option value="" readOnly>Select category</option>
                                        {categories.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className=" position-relative d-inline-block mx-auto  mb-4">
                                {image && isPut === false ?
                                    <>
                                        <img src={image}
                                            className="rounded-circle"
                                            alt="" />
                                        <Button color="danger" className="btn-icon" onClick={(e) => setImage("")}> <i className="ri-delete-bin-5-line" /> </Button>

                                    </> : null}
                                <div>
                                    <label htmlFor="formFile" className="form-label">Image</label>
                                    <input onChange={(e) => { return setImage(e.target.files[0]), setIsPut(true) }} type="file" id="formFile" />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="hstack gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" id="closebtn" onClick={() => setmodal_update(false)}>Fermer</button>
                                <button type="button" className="btn btn-primary" id="closebtn" onClick={() => updateProduct()}>Mettre à jour</button>
                            </div>
                        </ModalFooter>
                    </Form>
                </Modal>
            </> : null}
            {modal_list_view ? <>
                <Modal size="lg" isOpen={modal_list_view} toggle={() => { viewModal() }} centered >
                    <div className="modal-header">
                        <h5 className='modal-title'>Produit</h5>
                        <Button type="button" onClick={() => { setmodal_list_view(false); }} className="btn-close" aria-label="Close" >
                        </Button>
                    </div>
                    <Form>
                        <ModalBody>
                            <div className="mb-3" id="modal-id-update" style={{ display: "none" }}>
                                <label htmlFor="id-field" className="form-label"> id</label>
                                <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                            </div>
                            <div className="center  text-center  mx-auto  mb-4">
                                {image ?
                                    <img src={image}
                                        className="center rounded-circle avatar-sm img-thumbnail "
                                        alt="" /> : null}

                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label">Titre</label>
                                    <input type="text" id="customername-field" className="form-control" value={title} disabled />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label"> Prix</label>
                                    <input type="text" id="customername-field" className="form-control" value={price} disabled />
                                </div>


                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label"> Description</label>
                                    <textarea type="text" id="customername-field" className="form-control" value={description} disabled />
                                </div>


                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="customername-field" className="form-label"> Catégorie</label>
                                    <input type="text" id="customername-field" className="form-control" required value={category} disabled />
                                </div>


                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="hstack gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" id="closebtn" onClick={() => setmodal_list_view(false)}>Fermer</button>
                            </div>
                        </ModalFooter>
                    </Form>
                </Modal>
            </> : null}
            {modal_delete ?
                <> <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} centered >
                    <div className="modal-header">
                        <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                    </div>
                    <ModalBody>
                        <div className="mt-2 text-center">
                            <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                                colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                <h4>Êtes-vous sûr?</h4>
                                <p className="text-muted mx-4 mb-0">Êtes-vous sûr de vouloir supprimer cet enregistrement ?</p>
                            </div>
                        </div>
                        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Annuler</button>
                            <button type="button" className="btn w-sm btn-danger " id="delete-record" onClick={() => deleteProduct()}>Oui, Supprime le</button>
                        </div>
                    </ModalBody>
                </Modal>
                </> : null}
        </div>


    )
}


export default withAuth(ProductsPage);
