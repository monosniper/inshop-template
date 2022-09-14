import React from 'react';
import {$colors} from "../utils/config";
import {useColors} from "../hooks/useColors";

const ConfigStyles = () => {
    const colors = useColors()

    return (
        <style jsx global>{`
          body {
            background: ${colors.get($colors.background)} !important;
          }
          * {
            color: ${colors.get($colors.font_color)};
          }
          .contrast {
            color: ${colors.get($colors.contrast_color)} !important;
          }
          .contrast_hover:hover {
            color: ${colors.get($colors.contrast_color)} !important;
          }
          .contrast_border {
            border-color: ${colors.get($colors.contrast_color)} !important;
          }
          .header {
            color: ${colors.get($colors.header_color)} !important;
          }
          .footer {
            color: ${colors.get($colors.footer_color)} !important;
          }
          .product:hover .product__title {
            color: ${colors.get($colors.contrast_color)} !important;
          } 
          .button {
            background: ${colors.get($colors.contrast_color)} !important;
          }
          .modal__button {
            background: ${colors.get($colors.contrast_color)} !important;
          }
          .contrast_bg {
            background: ${colors.get($colors.contrast_color)} !important;
          }
          .contrast_path path {
            stroke: ${colors.get($colors.contrast_color)} !important;
            fill: ${colors.get($colors.contrast_color)} !important;
          }
        `}</style>
    );
};

export default ConfigStyles;