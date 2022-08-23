export const formErrorHandling = (errors, data, res, edit, optionalId) => {
    const souvenir = {
        "name": data.name,
        "quantity": data.quantity,
        "barCode": data.barCode,
        "imageUrl": data.imageUrl,
        "description": data.description
    }
    console.log("Error occured while adding souvenir.")
    console.log("Submitted data: " + data)
    console.log("Errors: " + errors)
    res.render('partials/souvenirForm', {souvenir: souvenir, home: '0', edit: edit, errors, id: optionalId});
}