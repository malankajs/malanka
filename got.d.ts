declare module "got" {
    interface Response {
        statusCode: number;
        body: string|Buffer|Object;
    }

    interface Request {
        json: boolean;
        headers: Object;
    }

    interface got {
        get: (url:string, options?:Request) => Promise<Response>;
    }

    export = got;
}
