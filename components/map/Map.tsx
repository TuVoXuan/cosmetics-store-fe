import React, { useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
	position: L.LatLngExpression | undefined;
	markerDraggable: boolean;
	onPositionChange: (value: L.LatLngExpression) => void;
}

const marker = L.icon({
	iconUrl: "/location-pin.png",
	iconSize: [50, 50],
});

function SetViewOnClick({ coords }: { coords: L.LatLngExpression }) {
	const map = useMap();
	map.setView(coords, map.getZoom());

	return null;
}

export default function Map({ position, markerDraggable, onPositionChange }: Props) {
	// const [position, setPosition] = useState<L.LatLngExpression>({ lat: 10.8781, lng: 106.806 });
	const markerRef = useRef<L.Marker<any>>(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					console.log("marker.getLatLng(): ", marker.getLatLng());
					// setPosition(marker.getLatLng());
					onPositionChange(marker.getLatLng());
				}
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<MapContainer
			style={{ height: "450px", width: "100%" }}
			center={position || { lat: 10.878201, lng: 106.806158 }}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker
				draggable={markerDraggable}
				ref={markerRef}
				eventHandlers={eventHandlers}
				icon={marker}
				position={position || { lat: 10.878201, lng: 106.806158 }}
			>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
				<SetViewOnClick coords={position || { lat: 10.878201, lng: 106.806158 }} />
			</Marker>
		</MapContainer>
	);
}
