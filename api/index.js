const love = async (ctx) => {
    ctx.log.info('IP name entering from %s', ctx.request.ip);
    ctx.redirect('love.html')
}

module.exports = {love};