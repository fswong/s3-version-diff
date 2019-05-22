import * as Aws from 'aws-sdk';
import { ListObjectVersionsRequest, ObjectVersion } from 'aws-sdk/clients/s3';

export class S3Service {
    private s3: Aws.S3;
    private bucket: string;
    constructor (region: string, bucket: string) {
        this.s3 = new Aws.S3(
            {
                region
            }
        );
    }
    
    async listObjectVersions(key: string, bucket = this.bucket): Promise<Array<ObjectVersion>> {
        try {
            const params = this.buildParams(key, bucket);
            const response  = await this.s3.listObjectVersions(params).promise();
            return response.Versions;
        } catch (err) {
            throw new Error(`Could not retrieve the versions for ${key}`);
        }
        
    }

    async getObject(key: string, bucket = this.bucket): Promise<any> {
        try {
            const params = this.buildParams(key, bucket);
            const response  = await this.s3.getObject(params).promise();
            return response.Body;
        } catch {
            throw new Error(`Could not retrieve the file ${key}`);
        }
    }

    private buildParams(key: string, bucket = this.bucket) {
        return {
            Bucket: bucket, 
            Key: key
        };
    }
}
