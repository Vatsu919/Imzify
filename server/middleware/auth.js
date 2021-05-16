import jwt from 'jsonwebtoken';


const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token)
        {
            res.status(500).json({message:'Not logged in'});
        }
        else
        {
           
            const decodedData = jwt.verify(token,'cloneyy');
            
            

            req.userId = decodedData?.id;

            next();
        }
        
    } catch (error) {
        
        console.log(error.message);
        if(error.message==='jwt expired')
        {
            res.status(401).json({message:'Token expired.Please login again.'});
        }
    }
}

export default auth;