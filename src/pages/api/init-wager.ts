import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function initWagerHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const bodyRequest = req.body;
    console.log('[SERVER] Request body', bodyRequest);
    console.log('API Key', process.env.API_KEY);
    fetch(process.env.BACKEND_ENDPOINT + '/init-wager', {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify(bodyRequest)
    })
        .then(response => {
            console.log('response', response);
            return response.json();
        })
        .then(data => {
            console.log('[SERVER] Data received after Init: ', data)
            res.status(200).json(data);
        })
        .catch(error => 
            {
                console.log('[SERVER] Error', error);
                res.status(201).json(error.message);
            }
        );
}
