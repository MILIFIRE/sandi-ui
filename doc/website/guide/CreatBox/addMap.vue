<template>
    <SDWebglRenderer :width="720" :height="360" :backgroundColor="0x1f63d1">
        <SDPerspectiveCamera :positionX="0.5" :positionY="0" :positionZ="16.9" />
        <SDScene>
            <SDMesh :positionZ="4" :scaleXYZ="5">
                <SDBoxGeometry :width="1" />
                <SDMeshBasicMaterial>
                    <SDTextureLoader :url="$withBase('/img/crate.gif')" type="map" />
                </SDMeshBasicMaterial>
            </SDMesh>
        </SDScene>
    </SDWebglRenderer>
</template>

