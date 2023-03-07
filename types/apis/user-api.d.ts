declare interface IUserBasicInfo {
	_id: string;
	email: string;
	birthday: string;
	gender: Gender;
	name: string;
}

declare interface JWTToken {
	email: string;
	exp: number;
	iat: number;
	jti: string;
	jwtToken: string;
	name: string;
	sub: string;
}

declare interface UpdateUser {
	name?: string;
	gender?: string;
	birthday?: string;
}

declare interface ChangePass {
	oldPass: string;
	newPass: string;
}

declare interface IUpdateAddress {
	addressId: string;
	addresss: IAddressAPI;
}
