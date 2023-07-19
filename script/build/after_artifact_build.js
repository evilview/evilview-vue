/**
 * The function (or path to file or module id) to be run after all artifacts are built.
 * @refer https://www.electron.build/configuration/configuration#afterallartifactbuild
 */

exports.default = function () {
    return ["/path/to/additional/result/file"]
}