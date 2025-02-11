import { mode } from "@chakra-ui/theme-tools"

export default function markdownRender(props) {
    return  {
        '.markdown-render': {
           wordBreak: 'break-word',
           'img': {
                display: 'inline-block'
           },
           '.hljs' : {
               padding: '1rem',
               borderRadius: '8px'
           },
           'ul,ol' : {
               paddingLeft: '1rem',
               margin: '1.2rem 0',
               li: {
                   margin: '.8rem 0'
               }
           },
           'h1': {
               fontSize: '1.8em',
               fontWeight: 'bold',
               marginBottom: '0.8rem'
           },
           'h2': {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '0.6rem'
            },
            'h3': {
                fontSize: '1.6em',
                fontWeight: '600',
                marginBottom: '0.4rem'
            },
            'h4': {
                fontSize: '1.4em',
                fontWeight: '600'
            },
            'h5,h6': {
                fontSize: '1.2em',
                fontWeight: 'normal'
            },
            p: {
                padding: '0.5rem 0',
            },
            blockquote: {
                lineHeight: '2rem',
                margin: '1.5rem 0',
                p :{
                    paddingLeft: '1rem',
                    fontWeight: '500',
                    fontStyle: 'italic',
                    borderLeftWidth: '.25rem',
                    borderLeftColor: '#e5e7eb',
                    color: mode("inherit", "'rgb(189, 189, 189)'")(props),
                    fontSize: '1.2rem',
                }
            },
            pre: {
                margin: '1.6rem 0',
                fontSize: '.95rem'
            },
            a: {
                textDecoration: 'underline !important'
            },
            'p code': {
                bg: mode('rgba(175, 184, 193, 0.2)', 'rgba(110, 118, 129, 0.3)')(props),
                borderRadius: '6px',
                padding: '3px 6px',
                wordBreak: "break-all"
            },
            '.at-user-link': {
                textDecoration: 'none !important',
                borderBottom: '2px dashed rgb(158, 158, 158)',
                margin:'0 3px',
                color: mode(props.theme.colors.teal[600], props.theme.colors.teal[200])(props),
                fontWeight: '550',
                paddingBottom: '2px'
            }       
        }
    }
}