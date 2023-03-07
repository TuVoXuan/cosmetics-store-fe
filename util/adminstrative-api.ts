import adminstrativeApi from "../api/adminstrative-api";

// export const getProvinces = (setValue: (value: any) => void) => {
// 	adminstrativeApi.getProvinces().then((value) => {
// 		const result = value.data.results.map((item) => {
// 			const option: IAdministrativeOption = {
// 				label: item.province_name,
// 				value: item.province_name,
// 				id: item.province_id,
// 			};
// 			return option;
// 		});

// 		setValue(result);
// 	});
// };

// export const getDistricts = (provinceId: string, setValue: (value: any) => void) => {
// 	adminstrativeApi.getDistricts(provinceId).then((value) => {
// 		const result = value.data.results.map((item) => {
// 			const option: IAdministrativeOption = {
// 				label: item.district_name,
// 				value: item.district_name,
// 				id: item.district_id,
// 			};
// 			return option;
// 		});

// 		setValue(result);
// 	});
// };

// export const getWards = (districtId: string, setValue: (value: any) => void) => {
// 	adminstrativeApi.getWards(districtId).then((value) => {
// 		const result = value.data.results.map((item) => {
// 			const option: IAdministrativeOption = {
// 				label: item.ward_name,
// 				value: item.ward_name,
// 				id: item.ward_id,
// 			};
// 			return option;
// 		});

// 		setValue(result);
// 	});
// };

// const handeleQueryProvince = async () => {
// 	console.log("start query");
// 	const provices = [];
// 	const res = await adminstrativeApi.getProvinces();
// 	for (let province of res.data.results) {
// 		provices.push({
// 			provinceId: province.province_id,
// 			provinceName: province.province_name,
// 			districts: [] as {
// 				districtId: string;
// 				districtName: string;
// 				wards: { wardId: string; wardName: string }[];
// 			}[],
// 		});

// 		setTimeout(() => {}, 1000);
// 		const res1 = await adminstrativeApi.getDistricts(province.province_id);
// 		for (let district of res1.data.results) {
// 			const provinceTemp = provices.find((item) => item.provinceId === province.province_id);
// 			if (provinceTemp) {
// 				provinceTemp.districts.push({
// 					districtId: district.district_id,
// 					districtName: district.district_name,
// 					wards: [],
// 				});

// 				setTimeout(() => {}, 1000);

// 				const wards = await adminstrativeApi.getWards(district.district_id);
// 				for (let ward of wards.data.results) {
// 					const districtTemp = provinceTemp.districts.find(
// 						(item) => item.districtId === district.district_id
// 					);
// 					if (districtTemp) {
// 						districtTemp.wards.push({
// 							wardId: ward.ward_id,
// 							wardName: ward.ward_name,
// 						});
// 					}
// 				}
// 			}
// 		}
// 	}

// 	console.log(provices);
// 	console.log("end query");
// };
