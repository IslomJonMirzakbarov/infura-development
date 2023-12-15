import { motion } from 'framer-motion'

const PageTransition = ({ children, ...restProps }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
