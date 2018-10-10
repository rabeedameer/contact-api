class ContactService {
    static async create(data){
        return {
            message: 'contact create'
        };
    }

    static async retrieve(id){
        return {
            message: 'contact retrieve'
        };
    }

    static async update(id){
        return {
            message : 'contact update'
        };
    }

    static async delete(id){
        return {
            message : 'contact delete'
        };
    }
    
}


module.exports = ContactService;