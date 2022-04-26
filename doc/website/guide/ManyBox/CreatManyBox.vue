<template>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1">
        <SDPerspectiveCamera :positionX="0.5" :positionY="4" :positionZ="3" />
        <SDOrbitControls />
        <SDScene>
            <SDTransformControls />
            <SDMesh :positionX="-2" :scaleXYZ="2">
                <SDBoxGeometry :width="1" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/img/crate.gif" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
            <SDMesh :positionX="2"  :scaleXYZ="2">
                <SDBoxGeometry :width="1" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader url="/img/crate.gif" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
        </SDScene>
    </SDWebglRenderer>
</template>

