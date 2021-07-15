module.exports = class User_dto {
    email: string;
    id: any;
    isActivated: boolean;

    constructor(model: any) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}