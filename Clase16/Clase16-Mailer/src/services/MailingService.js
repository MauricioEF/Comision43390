

const GMAIL_USER = "ing.mauricioespinosa.tutorias@gmail.com";
const GMAIL_PASSWORD = "yuac jmjt sfvy esga";

export default class MailingService {

    constructor(){
        this.transport = nodemailer.createTransport({
            service:'gmail',
            port:587,
            auth:{
                user:GMAIL_USER,
                pass:GMAIL_PASSWORD
            }
        })
    }

    sendMail = async (mailRequest) =>{
        const result = await transport.sendMail(mailRequest)
        return result;
    }
}