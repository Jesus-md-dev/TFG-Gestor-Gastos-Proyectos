-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2022 a las 20:05:27
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add auth token', 7, 'add_authtoken'),
(26, 'Can change auth token', 7, 'change_authtoken'),
(27, 'Can delete auth token', 7, 'delete_authtoken'),
(28, 'Can view auth token', 7, 'view_authtoken'),
(29, 'Can add expense', 8, 'add_expense'),
(30, 'Can change expense', 8, 'change_expense'),
(31, 'Can delete expense', 8, 'delete_expense'),
(32, 'Can view expense', 8, 'view_expense'),
(33, 'Can add project', 9, 'add_project'),
(34, 'Can change project', 9, 'change_project'),
(35, 'Can delete project', 9, 'delete_project'),
(36, 'Can view project', 9, 'view_project'),
(37, 'Can add ip_project', 10, 'add_ip_project'),
(38, 'Can change ip_project', 10, 'change_ip_project'),
(39, 'Can delete ip_project', 10, 'delete_ip_project'),
(40, 'Can view ip_project', 10, 'view_ip_project'),
(41, 'Can add ip_project', 11, 'add_ip_project'),
(42, 'Can change ip_project', 11, 'change_ip_project'),
(43, 'Can delete ip_project', 11, 'delete_ip_project'),
(44, 'Can view ip_project', 11, 'view_ip_project'),
(45, 'Can add expense', 12, 'add_expense'),
(46, 'Can change expense', 12, 'change_expense'),
(47, 'Can delete expense', 12, 'delete_expense'),
(48, 'Can view expense', 12, 'view_expense'),
(49, 'Can add project', 13, 'add_project'),
(50, 'Can change project', 13, 'change_project'),
(51, 'Can delete project', 13, 'delete_project'),
(52, 'Can view project', 13, 'view_project'),
(53, 'Can add profile', 14, 'add_profile'),
(54, 'Can change profile', 14, 'change_profile'),
(55, 'Can delete profile', 14, 'delete_profile'),
(56, 'Can view profile', 14, 'view_profile'),
(57, 'Can add project ip', 15, 'add_projectip'),
(58, 'Can change project ip', 15, 'change_projectip'),
(59, 'Can delete project ip', 15, 'delete_projectip'),
(60, 'Can view project ip', 15, 'view_projectip'),
(61, 'Can add project member', 16, 'add_projectmember'),
(62, 'Can change project member', 16, 'change_projectmember'),
(63, 'Can delete project member', 16, 'delete_projectmember'),
(64, 'Can view project member', 16, 'view_projectmember'),
(65, 'Can add expense', 17, 'add_expense'),
(66, 'Can change expense', 17, 'change_expense'),
(67, 'Can delete expense', 17, 'delete_expense'),
(68, 'Can view expense', 17, 'view_expense'),
(69, 'Can add project member', 18, 'add_projectmember'),
(70, 'Can change project member', 18, 'change_projectmember'),
(71, 'Can delete project member', 18, 'delete_projectmember'),
(72, 'Can view project member', 18, 'view_projectmember'),
(73, 'Can add project', 19, 'add_project'),
(74, 'Can change project', 19, 'change_project'),
(75, 'Can delete project', 19, 'delete_project'),
(76, 'Can view project', 19, 'view_project'),
(77, 'Can add income', 20, 'add_income'),
(78, 'Can change income', 20, 'change_income'),
(79, 'Can delete income', 20, 'delete_income'),
(80, 'Can view income', 20, 'view_income');

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$320000$y4z0ScV61JZA5s70yB11Gx$BgfzjS9hKaC9yXsEXSAm7Fx3Oz6NS7OT3FEN0fF6fWM=', '2022-08-18 07:06:14.037947', 1, 'admin', 'jezusd', 'marquez', 'aaadmin@gmail.com', 1, 1, '2022-03-24 16:48:39.636063'),
(21, 'pbkdf2_sha256$320000$gozQbZ2nerypicJPDMatvT$YSjKAcjyfstFIlqV439/clJnSHHJeAi3CBO/p0h/+co=', NULL, 0, 'pepito', 'Pepe', 'Garcia', 'pepito@email.com', 0, 1, '2022-03-30 16:54:50.776503'),
(38, 'pbkdf2_sha256$320000$ZsL5A8sy7WW6UrcCDyHE6j$codAnJx46Rg7QvRkgiUcvRLatENG+obF5DVYTr8wvCI=', NULL, 0, 'bbb', 'aaa', 'aaa', 'bbb@email.com', 0, 1, '2022-04-24 20:53:24.125495'),
(39, 'pbkdf2_sha256$320000$oCagQSvGEJZS65pzwAz2Wt$f2x5+YvkvplsRi3h45cJtWTWc0sTYwbYM3/6k6Uv7ME=', NULL, 0, 'ccc', 'aaa', 'aaa', 'ccc@email.com', 0, 1, '2022-04-24 20:53:28.539084'),
(40, 'pbkdf2_sha256$320000$0u7sxYXZ7PPOpVutZL1khz$TrM9B/JuK2dLQ3sHKU/MUILwcj7slTuEmpdfCExhCAg=', NULL, 0, 'ddd', 'aaa', 'aaa', 'ddd@email.com', 0, 1, '2022-04-24 20:53:34.895067'),
(41, 'pbkdf2_sha256$320000$u3VGLw8nhJzn4okYGzTy25$VRPtHSBCQopHrLCJwgPRDiIn4EFhqP4eRMAHs4P2Sms=', NULL, 0, 'fff', 'fernando', 'fff', 'fff@gmail.com', 0, 1, '2022-05-21 13:58:31.181884'),
(43, 'pbkdf2_sha256$320000$S6kx2QKMGXZWDA4b5PgEFX$LdL0eSChnKIU5GAr4J32sCmbksiyTTv8ZhGUCdGdcm4=', NULL, 0, 'test', 'jezu', 'marquez', 'newemail@gmail.com', 0, 1, '2022-05-30 16:12:27.149542'),
(44, 'pbkdf2_sha256$320000$Wa6ZO0vurtCYW3jmEFsKdt$/jh0a+JafeEf4iBQaa1kwA4Siqli0w5ySYg0Nh3GKC0=', NULL, 0, 'Claudia', 'Claudia', 'Claudia4', 'Claudia@gmail.com', 0, 1, '2022-05-30 16:13:26.644654'),
(45, 'pbkdf2_sha256$320000$u9FkxBE1nZbL92CalgPbzi$2BscLGNlaT1L/pIQLBqp7kEHM+d3A4kH+44qnsU2mao=', NULL, 0, 'Heredia', 'Heredia', 'Heredia', 'Heredia@gmail.com', 0, 1, '2022-05-30 16:13:47.606663'),
(54, 'pbkdf2_sha256$320000$8haYcx9Z4ku7bPe0XxL8Xf$ueDA4djMpqy+DJV2r/B1u23Bce90gO/ewHKbYmD4ifo=', NULL, 0, 'pepitoTest', 'pepitoTest', 'pepitoTest', 'pepitoTest@gmail.com', 0, 1, '2022-06-06 22:40:42.864632'),
(58, 'pbkdf2_sha256$320000$n7mkV1V9yaA4xD3629WMsb$CKcI5mEnj6zhCeVWOi24OEMxXpm7V5aVckHWPpKOmgA=', NULL, 0, 'eee', 'eee', 'eee', 'eee@gmail.com', 0, 1, '2022-07-19 17:27:26.318407'),
(59, 'pbkdf2_sha256$320000$B5L017nsMY77w5oV3BrFa6$me57Etmm5qEYzdwT+YogIU7jNtP5N7flbm//YE1n+Kc=', '2022-08-02 15:29:32.584929', 1, 'jesus', 'jezus', 'jezu', 'jesus@gmail.com', 1, 1, '2022-08-02 14:54:15.563881'),
(60, 'pbkdf2_sha256$320000$ClqymEhp4qF6BgsH8rhkFZ$EjVGY/DwB8gAWeUcF4AFqRw96AFIKmOIrIYdHOX4gHs=', '2022-08-02 14:57:47.401524', 1, 'jezu', 'aaa', 'aaa', 'jezu@gmail.com', 1, 1, '2022-08-02 14:57:42.478125'),
(62, 'pbkdf2_sha256$320000$XZ6pdoyVRSdeJqhV2MKDIY$GrWt3eIwcx7Ah6sHF7JeIdbGl9eagaUqENyeIujtS88=', NULL, 0, 'aaa', 'aaa', 'aaa', 'aaa@gmail.com', 0, 1, '2022-08-09 17:51:26.081760'),
(63, 'pbkdf2_sha256$320000$UJ8vSehIeRog9MCriXR1nR$z542IXG7PFj0yrUbuGh8+hJJP4aMH2ca8sIkrhlEES4=', NULL, 0, 'tuputamadre', 'aaa', 'aaa', 'aava@gmail.com', 0, 1, '2022-08-09 18:01:50.788748'),
(64, 'pbkdf2_sha256$320000$FZuLFti8GLHgp9RQEgHwzI$lbyjQXNKoNGEgc1Hh3prl7TAFHG341fYsZ/y1cVV9JY=', NULL, 0, 'mecagoenmismuertospisaos', 'mi puta madre', 'monta a caballo', 'mismuertosacaballo@gmail.com', 0, 1, '2022-08-09 18:05:07.309859'),
(65, 'pbkdf2_sha256$320000$QAJinwyQqMmpHctBe59KNh$EwcB750U78IB8lgYnzbpulSqIBCY7QLHQZMXGeZigjk=', NULL, 0, 'putito', 'putito', 'putito putito', 'putito@gmail.com', 0, 1, '2022-08-09 18:05:58.892616'),
(67, 'pbkdf2_sha256$320000$Gnzpf57WNl1U4GromR2nXR$/ZlFtVSsUDwlJsTjMi/16gJhd6hvPTY+SMk/FQBVJoc=', NULL, 0, 'TutorialUser', 'TutorialName', 'TutorialLastName', 'TutorialUser@gmail.com', 0, 1, '2022-08-09 21:20:39.528396'),
(68, 'pbkdf2_sha256$320000$lQxRltaYVAOuvuU8IzdqCx$GnXUXCt9uomonwpObF6Kgoem1T4Xi1x/IqzOVmUS69g=', NULL, 0, 'Heredia1', 'heredia', 'heredia', 'Heredia1@gmail.com', 0, 1, '2022-08-11 00:53:24.356655'),
(69, 'pbkdf2_sha256$320000$xo61lJiwWu3LcYzB8TBwZ2$JXWWPsoa+ah2bjl5EzqRbm/ZhptNRNB2IIej5uyQZ7s=', NULL, 0, 'TestAdministrador', 'TestAdministrador', 'TestAdministrador', 'TestAdministrador@gmail.com', 0, 1, '2022-08-19 16:05:12.760441'),
(70, 'pbkdf2_sha256$320000$3Q79oV0kIzSgFVPUkLyfuE$Fc3I0Q2vWlSOqp/yAYLX4rffrJtvIdeeDfCfhNMpwKk=', NULL, 0, 'TestGestor', 'TestGestor', 'TestGestor', 'TestGestor@gmail.com', 0, 1, '2022-08-19 16:06:24.037941'),
(71, 'pbkdf2_sha256$320000$4kcQFnE33aCHsxVpPa8IKk$PZibrdiXqPK/qBcS7CL8VHwZNOCJRdw38aaRpZ/FJhA=', NULL, 0, 'TestMiembro', 'TestMiembro', 'TestMiembro', 'TestMiembro@gmail.com', 0, 1, '2022-08-19 16:07:08.557941');

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2022-04-23 16:10:36.342974', '23', 'aaa', 3, '', 4, 1),
(2, '2022-04-23 16:15:01.436372', '24', 'aaa', 3, '', 4, 1),
(3, '2022-04-23 16:15:19.205786', '25', 'aaa', 3, '', 4, 1),
(4, '2022-04-23 16:15:34.353059', '26', 'aaa', 3, '', 4, 1),
(5, '2022-04-23 18:29:27.906868', '27', 'aaa', 3, '', 4, 1),
(6, '2022-04-23 18:29:27.909369', '28', 'aaa2', 3, '', 4, 1),
(7, '2022-04-23 18:29:27.911371', '29', 'aaa32', 3, '', 4, 1),
(8, '2022-04-23 18:29:27.914874', '30', 'aaa323', 3, '', 4, 1),
(9, '2022-04-24 12:37:31.088376', '33', 'aaa', 3, '', 4, 1),
(10, '2022-04-24 12:37:31.089877', '34', 'aaa2', 3, '', 4, 1),
(11, '2022-04-24 12:37:31.091379', '32', 'aaa3223', 3, '', 4, 1),
(12, '2022-04-24 12:37:31.092880', '31', 'aaa323', 3, '', 4, 1),
(13, '2022-04-24 12:37:31.096383', '35', 'bbb', 3, '', 4, 1),
(14, '2022-04-24 12:37:31.097384', '36', 'ccc', 3, '', 4, 1),
(15, '2022-04-24 12:37:31.098885', '37', 'fff', 3, '', 4, 1),
(16, '2022-04-26 16:06:03.406035', '3', 'Profile object (3)', 2, '[{\"changed\": {\"fields\": [\"Img\"]}}]', 14, 1),
(17, '2022-05-16 17:26:57.631248', '4', 'ProjectMember object (4)', 3, '', 16, 1),
(18, '2022-05-16 17:26:57.633751', '3', 'ProjectMember object (3)', 3, '', 16, 1),
(19, '2022-05-16 17:26:57.636252', '2', 'ProjectMember object (2)', 3, '', 16, 1),
(20, '2022-05-16 17:26:57.638254', '1', 'ProjectMember object (1)', 3, '', 16, 1),
(21, '2022-05-23 19:48:26.013317', '16', 'Expense object (16)', 3, '', 12, 1),
(22, '2022-05-23 19:48:26.015820', '15', 'Expense object (15)', 3, '', 12, 1),
(23, '2022-05-23 19:48:26.016820', '14', 'Expense object (14)', 3, '', 12, 1),
(24, '2022-05-23 19:48:26.018322', '13', 'Expense object (13)', 3, '', 12, 1),
(25, '2022-05-23 19:48:26.021825', '12', 'Expense object (12)', 3, '', 12, 1),
(26, '2022-05-23 19:48:26.022826', '11', 'Expense object (11)', 3, '', 12, 1),
(27, '2022-05-23 19:48:26.024326', '10', 'Expense object (10)', 3, '', 12, 1),
(28, '2022-05-23 19:48:26.025328', '9', 'Expense object (9)', 3, '', 12, 1),
(29, '2022-05-23 19:48:26.027330', '8', 'Expense object (8)', 3, '', 12, 1),
(30, '2022-05-23 19:48:26.028831', '7', 'Expense object (7)', 3, '', 12, 1),
(31, '2022-05-23 19:48:26.029832', '6', 'Expense object (6)', 3, '', 12, 1),
(32, '2022-05-23 19:48:26.031332', '5', 'Expense object (5)', 3, '', 12, 1),
(33, '2022-05-23 19:48:26.032834', '4', 'Expense object (4)', 3, '', 12, 1),
(34, '2022-06-06 16:25:23.204555', '3', 'Profile object (3)', 2, '[{\"changed\": {\"fields\": [\"Img\"]}}]', 14, 1),
(35, '2022-06-06 16:53:49.850465', '3', 'Profile object (3)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(36, '2022-06-06 22:39:57.846032', '22', 'pepito2', 3, '', 4, 1),
(37, '2022-06-06 22:39:57.848035', '47', 'pepito3', 3, '', 4, 1),
(38, '2022-06-06 22:39:57.849035', '48', 'pepito4', 3, '', 4, 1),
(39, '2022-06-06 22:39:57.850536', '53', 'pepito5', 3, '', 4, 1),
(40, '2022-06-06 22:50:37.027335', '34', 'Profile object (34)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(41, '2022-06-06 22:50:38.578291', '35', 'Profile object (35)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(42, '2022-06-06 22:50:42.857472', '33', 'Profile object (33)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(43, '2022-06-06 22:50:54.752202', '31', 'Profile object (31)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(44, '2022-06-06 22:50:58.778561', '30', 'Profile object (30)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(45, '2022-06-06 22:51:03.261780', '29', 'Profile object (29)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(46, '2022-06-06 22:51:07.755703', '28', 'Profile object (28)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(47, '2022-06-06 23:18:16.318209', '11', 'Profile object (11)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(48, '2022-06-28 17:42:00.879673', '14', 'Expense object (14)', 3, '', 17, 1),
(49, '2022-06-28 17:42:05.334867', '9', 'Expense object (9)', 3, '', 17, 1),
(50, '2022-07-31 20:13:51.704445', '44', 'Profile object (44)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(51, '2022-07-31 20:14:03.919505', '35', 'Profile object (35)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(52, '2022-07-31 21:02:56.970695', '35', 'Profile object (35)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(53, '2022-07-31 22:58:15.295674', '35', 'Profile object (35)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(54, '2022-07-31 22:59:17.258748', '35', 'Profile object (35)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 1),
(55, '2022-08-02 14:55:18.775662', '1', 'admin', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 4, 59),
(56, '2022-08-03 17:43:34.359198', 'e9503d3bce1844bea4c2cb41a42d36570fee981dbc7fe4cf4caab15f8a602631589d631a3fa62ec5a4be04a8344157beec72597b61032031d314fa1f97f1ed91', 'e9503d3bce1844bea4c2cb41a42d36570fee981dbc7fe4cf4caab15f8a602631589d631a3fa62ec5a4be04a8344157beec72597b61032031d314fa1f97f1ed91 : test', 3, '', 7, 60),
(57, '2022-08-03 17:43:34.365202', 'dba3c3c5e39cb1cb1fc177fd7cb684e93791d2db8c2bfff7b923fd44f7246c12b36ebfa7aaec00fff4a730c69d1d93e0beb42741acd680d92964d4801e4bcc53', 'dba3c3c5e39cb1cb1fc177fd7cb684e93791d2db8c2bfff7b923fd44f7246c12b36ebfa7aaec00fff4a730c69d1d93e0beb42741acd680d92964d4801e4bcc53 : eee', 3, '', 7, 60),
(58, '2022-08-03 17:43:34.367204', 'c6369e63100529d014aa26db94863addc98f224a4a5b73bb2de1dbc8bb2844abf52f8d42ca1a24a0c2a16583230e44934e2baa93581e29eb74e898b8aa98db8d', 'c6369e63100529d014aa26db94863addc98f224a4a5b73bb2de1dbc8bb2844abf52f8d42ca1a24a0c2a16583230e44934e2baa93581e29eb74e898b8aa98db8d : pepitoTest', 3, '', 7, 60),
(59, '2022-08-03 17:43:34.368705', '9e34f98431eb197e01943e7290e6224772a778a58fdb5782caeb5c3d665722bc73943ada4f22fc9bed757ba714f1975f2b049185113c4bf3a938dbbc3262c210', '9e34f98431eb197e01943e7290e6224772a778a58fdb5782caeb5c3d665722bc73943ada4f22fc9bed757ba714f1975f2b049185113c4bf3a938dbbc3262c210 : test', 3, '', 7, 60),
(60, '2022-08-03 17:43:34.370707', '4e5701f0f43ea933002364dad019d5d125a7a62712920b56825f2ce792b9ca825f132114581f6c5aecbc9df9541b72b02170d8f360208fdef42f23d149620c1a', '4e5701f0f43ea933002364dad019d5d125a7a62712920b56825f2ce792b9ca825f132114581f6c5aecbc9df9541b72b02170d8f360208fdef42f23d149620c1a : bbb', 3, '', 7, 60),
(61, '2022-08-03 17:43:34.372710', '4be3239665c7ac51b3f18397cfa855ac33469a974a8f80c9e0a692c2c34fac1a683a041e90bb60ba852080bd939b504db707e9ff19baf29b5c3d05f9b986be92', '4be3239665c7ac51b3f18397cfa855ac33469a974a8f80c9e0a692c2c34fac1a683a041e90bb60ba852080bd939b504db707e9ff19baf29b5c3d05f9b986be92 : fff', 3, '', 7, 60),
(62, '2022-08-03 17:43:34.374210', '3f2052ea6f00590f94932334c9439ab0a73fcc68725b24a59f6fabae534ed50b7d4337052c77090f878cf70b12efd06982986cd2d3cb3e6d33c2368273dd8d14', '3f2052ea6f00590f94932334c9439ab0a73fcc68725b24a59f6fabae534ed50b7d4337052c77090f878cf70b12efd06982986cd2d3cb3e6d33c2368273dd8d14 : admin', 3, '', 7, 60),
(63, '2022-08-03 17:43:34.376213', '30ddb86fb434359cc33228a4a4a0c51a31754ed34fc37e977bdbc491c26cb1ff85cad6b0a4df65f378fe0014015f178e8d2869d795db5d7d2e659c02ce255c54', '30ddb86fb434359cc33228a4a4a0c51a31754ed34fc37e977bdbc491c26cb1ff85cad6b0a4df65f378fe0014015f178e8d2869d795db5d7d2e659c02ce255c54 : ccc', 3, '', 7, 60),
(64, '2022-08-03 17:43:34.378715', '01cf58f11d113fb7df91e7b6ebb4cb5642e82fb22a79d1c1483e219d67d3e001d67440cc972042c83aae61ddf02db72a4995df6f7a6489e2a0377cb753afe2cf', '01cf58f11d113fb7df91e7b6ebb4cb5642e82fb22a79d1c1483e219d67d3e001d67440cc972042c83aae61ddf02db72a4995df6f7a6489e2a0377cb753afe2cf : pepito', 3, '', 7, 60),
(65, '2022-08-03 17:46:04.720781', '7aef4de176ecb3f6a0310f0fe0f21b6a49f04a9c947f254df4fba87767f7377735c61bb44cfba561e64f89085c246ddbd6268ff4c8136b9bd26de14918c1135b', '7aef4de176ecb3f6a0310f0fe0f21b6a49f04a9c947f254df4fba87767f7377735c61bb44cfba561e64f89085c246ddbd6268ff4c8136b9bd26de14918c1135b : admin', 3, '', 7, 60),
(66, '2022-08-03 17:46:30.548480', '453b0d49c40419c6de8fe8dd7d2e6ed23dd8e4941e88f32de51e34b26681c12cdbc52d73d74f0a83b9858aeee2de6fe23969368251a06628f4c1d25bd8a92ba7', '453b0d49c40419c6de8fe8dd7d2e6ed23dd8e4941e88f32de51e34b26681c12cdbc52d73d74f0a83b9858aeee2de6fe23969368251a06628f4c1d25bd8a92ba7 : admin', 3, '', 7, 60),
(67, '2022-08-10 15:53:39.719217', '23', 'Project object (23)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 19, 59),
(68, '2022-08-10 15:53:48.956141', '57', 'Profile object (57)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 14, 59),
(69, '2022-08-11 00:21:12.395066', '36', 'ProjectMember object (36)', 3, '', 18, 59),
(70, '2022-08-11 00:21:12.397568', '35', 'ProjectMember object (35)', 3, '', 18, 59),
(71, '2022-08-18 07:06:54.846447', '41', 'ProjectMember object (41)', 3, '', 18, 1),
(72, '2022-08-18 07:06:54.848446', '22', 'ProjectMember object (22)', 3, '', 18, 1),
(73, '2022-08-19 17:49:07.656283', '24', 'Project object (24)', 3, '', 19, 1),
(74, '2022-08-19 17:49:07.659282', '21', 'Project object (21)', 3, '', 19, 1),
(75, '2022-08-19 17:49:07.661282', '20', 'Project object (20)', 3, '', 19, 1),
(76, '2022-08-19 17:49:07.664283', '12', 'Project object (12)', 3, '', 19, 1),
(77, '2022-08-19 17:49:07.665782', '11', 'Project object (11)', 3, '', 19, 1),
(78, '2022-08-19 17:49:07.667782', '10', 'Project object (10)', 3, '', 19, 1),
(79, '2022-08-19 17:49:07.669282', '9', 'Project object (9)', 3, '', 19, 1),
(80, '2022-08-19 17:49:07.671283', '5', 'Project object (5)', 3, '', 19, 1),
(81, '2022-08-19 17:49:07.674782', '4', 'Project object (4)', 3, '', 19, 1);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(8, 'endpoints', 'expense'),
(10, 'endpoints', 'ip_project'),
(9, 'endpoints', 'project'),
(17, 'expenses', 'expense'),
(20, 'incomes', 'income'),
(7, 'knox', 'authtoken'),
(19, 'projects', 'project'),
(18, 'projects', 'projectmember'),
(6, 'sessions', 'session'),
(12, 'users', 'expense'),
(11, 'users', 'ip_project'),
(14, 'users', 'profile'),
(13, 'users', 'project'),
(15, 'users', 'projectip'),
(16, 'users', 'projectmember');

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2022-03-24 16:48:14.906496'),
(2, 'auth', '0001_initial', '2022-03-24 16:48:15.260482'),
(3, 'admin', '0001_initial', '2022-03-24 16:48:15.343689'),
(4, 'admin', '0002_logentry_remove_auto_add', '2022-03-24 16:48:15.350695'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2022-03-24 16:48:15.355700'),
(6, 'contenttypes', '0002_remove_content_type_name', '2022-03-24 16:48:15.405900'),
(7, 'auth', '0002_alter_permission_name_max_length', '2022-03-24 16:48:15.444934'),
(8, 'auth', '0003_alter_user_email_max_length', '2022-03-24 16:48:15.457445'),
(9, 'auth', '0004_alter_user_username_opts', '2022-03-24 16:48:15.465452'),
(10, 'auth', '0005_alter_user_last_login_null', '2022-03-24 16:48:15.495846'),
(11, 'auth', '0006_require_contenttypes_0002', '2022-03-24 16:48:15.498143'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2022-03-24 16:48:15.503852'),
(13, 'auth', '0008_alter_user_username_max_length', '2022-03-24 16:48:15.514548'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2022-03-24 16:48:15.525058'),
(15, 'auth', '0010_alter_group_name_max_length', '2022-03-24 16:48:15.536918'),
(16, 'auth', '0011_update_proxy_permissions', '2022-03-24 16:48:15.542501'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2022-03-24 16:48:15.553009'),
(18, 'knox', '0001_initial', '2022-03-24 16:48:15.598068'),
(19, 'knox', '0002_auto_20150916_1425', '2022-03-24 16:48:15.655112'),
(20, 'knox', '0003_auto_20150916_1526', '2022-03-24 16:48:15.670626'),
(21, 'knox', '0004_authtoken_expires', '2022-03-24 16:48:15.681636'),
(22, 'knox', '0005_authtoken_token_key', '2022-03-24 16:48:15.702654'),
(23, 'knox', '0006_auto_20160818_0932', '2022-03-24 16:48:15.759702'),
(24, 'knox', '0007_auto_20190111_0542', '2022-03-24 16:48:15.772713'),
(25, 'knox', '0008_remove_authtoken_salt', '2022-03-24 16:48:15.783724'),
(26, 'sessions', '0001_initial', '2022-03-24 16:48:15.808691'),
(27, 'endpoints', '0001_initial', '2022-03-24 16:56:16.270832'),
(28, 'endpoints', '0002_remove_proyect_admin_expense_id_proyect_and_more', '2022-03-24 16:56:16.538947'),
(29, 'endpoints', '0003_rename_id_proyect_ip_proyect_proyect_and_more', '2022-03-24 16:56:16.876879'),
(30, 'endpoints', '0004_rename_proyect_project', '2022-03-24 16:56:17.060023'),
(31, 'endpoints', '0005_rename_id_proyect_expense_project_and_more', '2022-03-24 16:56:17.320731'),
(32, 'endpoints', '0006_rename_ip_proyect_ip_project', '2022-03-24 16:56:17.339747'),
(33, 'endpoints', '0007_project_img_user_img_alter_user_email', '2022-03-24 16:56:17.380282'),
(34, 'endpoints', '0008_alter_expense_user_alter_ip_project_user_and_more', '2022-03-24 16:56:17.738446'),
(35, 'endpoints', '0009_remove_ip_project_project_remove_ip_project_user_and_more', '2022-03-28 17:03:22.876718'),
(37, 'users', '0002_profile', '2022-03-29 15:53:00.679336'),
(38, 'users', '0003_alter_expense_amount_alter_expense_final_amount', '2022-04-04 16:32:21.071781'),
(39, 'users', '0001_initial', '2022-04-04 16:52:13.041310'),
(40, 'users', '0002_projectip_delete_ip_project', '2022-04-05 15:35:59.689700'),
(41, 'users', '0003_projectmember_delete_projectip', '2022-04-05 15:48:55.486140'),
(42, 'users', '0004_alter_project_img', '2022-04-23 16:16:01.481770'),
(43, 'users', '0005_alter_expense_date', '2022-05-23 19:28:43.112626'),
(44, 'users', '0006_delete_expense', '2022-05-29 18:04:44.043830'),
(45, 'expenses', '0001_initial', '2022-05-29 18:04:44.178946'),
(46, 'projects', '0001_initial', '2022-05-29 18:12:58.909470'),
(47, 'expenses', '0002_alter_expense_project', '2022-05-29 18:12:59.328830'),
(48, 'users', '0007_remove_projectmember_project_and_more', '2022-05-29 18:12:59.495473'),
(49, 'users', '0008_alter_profile_img', '2022-06-06 16:22:49.664904'),
(50, 'users', '0009_alter_profile_img', '2022-06-06 16:51:19.473536'),
(51, 'expenses', '0003_alter_expense_dossier', '2022-06-23 16:08:42.133972'),
(52, 'expenses', '0004_alter_expense_dossier', '2022-06-23 16:08:42.145982'),
(53, 'projects', '0002_alter_project_img', '2022-06-23 16:08:42.213540'),
(54, 'projects', '0003_alter_project_img', '2022-06-23 16:08:42.224549'),
(55, 'users', '0010_alter_profile_img', '2022-06-23 16:08:42.236059'),
(56, 'expenses', '0005_alter_expense_vatpercentage', '2022-06-26 19:48:01.596290'),
(57, 'expenses', '0006_alter_expense_vatpercentage', '2022-07-29 17:15:53.521243'),
(58, 'incomes', '0001_initial', '2022-07-29 17:21:56.317428'),
(59, 'projects', '0004_rename_is_ip_projectmember_is_manager', '2022-07-30 23:41:39.313734');

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('45i5jed3ons04547fg11zbd02g4r70p6', '.eJxVjEEOwiAQRe_C2pAWOgO4dO8ZCAODVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIsRnH63SjEB9cdpHuotyZjq-syk9wVedAury3x83K4fwcl9PKtHdmEE0Ia2ARGjDwocpQVWY3OgDI2TIiQkXVEQACdAQkhxuRgzOL9Ad2TN5s:1nyFTK:FE3rVcNq0YhCPgEp74aBRoz4_29InwUk9G1o3Zs5UXg', '2022-06-20 16:20:54.632395'),
('4qud1z776kvt74ufbxpu82pnw8d8z3kr', '.eJxVjEEOwiAQRe_C2pAWOgO4dO8ZCAODVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIsRnH63SjEB9cdpHuotyZjq-syk9wVedAury3x83K4fwcl9PKtHdmEE0Ia2ARGjDwocpQVWY3OgDI2TIiQkXVEQACdAQkhxuRgzOL9Ad2TN5s:1nsnA4:gKZLvrybIJNuQzzkofp83_PBsyMdEjq4UF0nvhR7W_s', '2022-06-05 15:06:28.793424'),
('5kdbsgpupjnqq74khw4z1vw5hbnnms8p', '.eJxVjMEOwiAQRP-FsyFsoAt49O43kF0WpWpoUtqT8d9tkx50jvPezFslWpea1l7mNIo6KzTq9Fsy5WdpO5EHtfuk89SWeWS9K_qgXV8nKa_L4f4dVOp1W9st4qKjgiYCoc_gfYg3Z8GjC-SKZxiyt4xWbDAy2MIOmAUwIID6fAHZSzbo:1oItL9:jHu-jqfh4-S9kS0cVxR7ZRA8cLxmiw7fxHWhVoWBS0g', '2022-08-16 14:57:47.405526'),
('81gd2782yeajdq7zx6ph916fv2yyhyww', '.eJxVjEEOwiAQRe_C2pAWOgO4dO8ZCAODVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIsRnH63SjEB9cdpHuotyZjq-syk9wVedAury3x83K4fwcl9PKtHdmEE0Ia2ARGjDwocpQVWY3OgDI2TIiQkXVEQACdAQkhxuRgzOL9Ad2TN5s:1o5Xpq:a1H6gpyEqjpdtvrodiFNzdjsEjsOvY3WClhKiBmAKr8', '2022-07-10 19:22:18.313947'),
('lymgieezqc0mr4ivfhh2ss0wu42qkc0e', '.eJxVjMsOwiAQRf-FtSFDy_Bw6d5vIMMAUjU0Ke3K-O_apAvd3nPOfYlA21rD1vMSpiTOQonT7xaJH7ntIN2p3WbJc1uXKcpdkQft8jqn_Lwc7t9BpV6_NWiIUNAhc0HP2mD2o7E0QLSUga0l7QkdlTwmn6IyjBqQXRwQjUri_QHf-TfS:1oOZba:cNglfJ0swLjIdCN64a1QVw5xSx0-lAPUavZfKP1GwSo', '2022-09-01 07:06:14.043447'),
('tendtzxrkqru3nrmapejf701ptqx93dc', '.eJxVjDsOwjAQRO_iGll21r9Q0nMGy-tdcAA5UpxUiLvjSClA0715M28R07aWuDVe4kTiLOwoTr8QU35y3Rt6pHqfZZ7rukwod0UebZPXmfh1Ody_g5Ja6Ws1BDIZtQM1YM_NgzHeaQMaRgRtMJAPlgNl1piwU7akVHZOoQcrPl_lmDc1:1oItps:BkMMpDGbYj1-AKoQwKIIEczKEjCjbBd2yyQG0bJ_k_k', '2022-08-16 15:29:32.589433'),
('tu83cqyhgfnahcw5zvkz9unjkshpkhkz', '.eJxVjEEOwiAQRe_C2pAWOgO4dO8ZCAODVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIsRnH63SjEB9cdpHuotyZjq-syk9wVedAury3x83K4fwcl9PKtHdmEE0Ia2ARGjDwocpQVWY3OgDI2TIiQkXVEQACdAQkhxuRgzOL9Ad2TN5s:1o8PeR:zcBxPPZdsk_BMCM6-KQ3F9e1qH5bJ9dyy9cjSDqg-ds', '2022-07-18 17:14:23.894534'),
('y2qs3m8czefaurvtrv2qt7p7uzmhq4d0', '.eJxVjEEOwiAQRe_C2pAWOgO4dO8ZCAODVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIsRnH63SjEB9cdpHuotyZjq-syk9wVedAury3x83K4fwcl9PKtHdmEE0Ia2ARGjDwocpQVWY3OgDI2TIiQkXVEQACdAQkhxuRgzOL9Ad2TN5s:1niIFC:cozlzkDyd1UL3QjVkD-yQDphDicQMBOXg8703v3on9Q', '2022-05-07 16:04:22.249517'),
('ywqa9kvpuhv3wc9z3e27s25w55kpp0xc', '.eJxVjEEOwiAQRe_C2pAWOgO4dO8ZCAODVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIsRnH63SjEB9cdpHuotyZjq-syk9wVedAury3x83K4fwcl9PKtHdmEE0Ia2ARGjDwocpQVWY3OgDI2TIiQkXVEQACdAQkhxuRgzOL9Ad2TN5s:1nbl6u:oMdHvX_Qo3zvkz3U8ZnOHojeVoygruSn3bDynXiDkF4', '2022-04-19 15:28:48.999497'),
('z2u50x6mdbnp2ky4t34ta3yuoa95ojp2', '.eJxVjEEOwiAQRe_C2pAWOgO4dO8ZCAODVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIsRnH63SjEB9cdpHuotyZjq-syk9wVedAury3x83K4fwcl9PKtHdmEE0Ia2ARGjDwocpQVWY3OgDI2TIiQkXVEQACdAQkhxuRgzOL9Ad2TN5s:1nnf3U:n3O-8EXCxerQwDgaYn4sWdpicRotwEfqFiumZ8v5RNk', '2022-05-22 11:26:28.091193');

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `expenses_expense`
--

INSERT INTO `expenses_expense` (`id`, `dossier`, `date`, `concept`, `amount`, `vatpercentage`, `final_amount`, `project_id`, `user_id`) VALUES
(23, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(24, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(25, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(26, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(27, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(28, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(29, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(30, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(31, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(32, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(33, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(34, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(35, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(36, '', '2022-06-13', 'GNMA', 22, 10, 24.2, 8, 38),
(37, '', '2022-07-04', 'hgjhj', 22, 22, 26.84, 8, 38),
(39, '', '2021-12-31', 'cvbcvb', 33, 33, 43.89, 8, 1),
(40, '', '2022-07-05', 'dfg', 33, 33, 43.89, 8, 38),
(41, '', '2022-07-04', 'gghfg', 44, 44, 63.36, 8, 39),
(42, '', '2022-05-20', 'expense concept', 100.5, 21, 121.61, 8, 1),
(43, '', '2022-05-20', 'expense concept', 100.5, 21, 121.61, 8, 1),
(46, '', '2022-08-01', 'asaf', 44, 11, 48.84, 16, 60),
(49, '', '2017-06-20', 'asd', 22, 31, 28.82, 16, 45),
(52, 'documents/StatementOfResult_Bm5LwAZ.pdf', '2022-08-03', 'asd', 22, 33, 29.26, 8, 38),
(53, '', '2022-08-04', 'asd', 22, 31, 28.82, 16, 1),
(54, '', '2022-08-01', 'asd', 22, 33, 29.26, 8, 44),
(57, 'documents/PDF_2hjiiet.pdf', '2022-08-08', 'sdf', 33, 45, 47.85, 8, 45),
(58, 'documents/StatementOfResult_SL6eSwg.pdf', '2022-08-08', 'asfas', 22, 31, 28.82, 8, 39),
(59, '', '2022-08-08', 'fcvgng', 33, 33, 43.89, 8, 1),
(66, '', '2022-08-09', 'ghj', 55, 32, 72.6, 23, 38),
(67, '', '2022-08-04', 'ccc', 44, 21, 53.24, 23, 62),
(68, '', '2022-08-01', 'fgdfgdg', 50, 21, 60.5, 23, 39),
(69, '', '2021-12-01', 'hjghjghj', 33, 21, 39.93, 23, 41),
(70, 'documents/PDF_LgYqybd.pdf', '2022-07-04', 'asd', 100, 21, 121, 23, 67),
(71, '', '2022-03-01', 'aa', 200, 22, 244, 23, 40),
(72, '', '2021-12-23', 'gg', 200, 21, 242, 23, 58),
(73, '', '2022-04-13', 'jj', 50, 21, 60.5, 23, 67),
(74, '', '2022-05-04', 'nnn', 55, 21, 66.55, 23, 62),
(75, '', '2022-06-30', 'nnn', 30, 21, 36.3, 23, 41),
(76, '', '2022-08-03', 'gg', 100, 21, 121, 23, 40),
(77, '', '2022-08-09', 'Mcdonal', 31, 20, 37.2, 8, 38),
(79, 'documents/PDF_E530oIT.pdf', '2022-08-10', 'afaf', 22, 21, 26.62, 25, 70),
(80, '', '2022-08-12', 'fsdfda', 242, 26, 304.92, 25, 71),
(81, 'documents/PDF_LrrK6Og.pdf', '2022-08-04', 'gkhjk', 22, 31, 28.82, 25, 69);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `incomes_income`
--

INSERT INTO `incomes_income` (`id`, `dossier`, `date`, `concept`, `amount`, `project_id`) VALUES
(2, '', '2022-04-04', 'conceptUpdated', 200.25, 8),
(3, '', '2022-05-20', 'income concept', 100.5, 8),
(4, '', '2022-05-20', 'income concept', 100.5, 8),
(5, '', '2022-05-20', 'income concept', 100.5, 8),
(7, '', '2022-07-04', 'sadfsdfgsd', 500, 8),
(8, '', '2022-07-04', 'zddfsdfaaa', 423, 8),
(9, 'documents/StatementOfResult.pdf', '2022-08-01', 'dfgdfg', 1500, 16),
(11, '', '2022-08-01', 'asdasd', 22, 16),
(12, 'documents/StatementOfResult_2QUMkSs.pdf', '2022-08-01', 'kljl', 66, 16),
(15, '', '2022-08-01', 'mnm', 455, 8),
(16, 'documents/Captura_de_pantalla_2022-08-01_190843.jpg', '2022-08-02', 'cvbcvb', 344, 8),
(17, '', '2022-08-02', 'asd', 22, 8),
(18, 'documents/PDF_2xb1hxv.pdf', '2022-08-08', 'sdfsf', 333, 8),
(24, 'documents/PDF.pdf', '2022-08-03', 'gvfhn', 55, 8),
(28, '', '2022-08-09', 'ghjghj', 33, 8),
(29, 'documents/PDF_1qABttJ.pdf', '2022-08-01', 'sdfsdf', 1000, 23),
(30, 'documents/PDF_VU3g0dz.pdf', '2022-08-02', 'eee', 2000, 23),
(31, 'documents/PDF_lZGP2fN.pdf', '2022-08-09', 'dfvbdfbgvb', 2000, 25);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `knox_authtoken`
--

INSERT INTO `knox_authtoken` (`digest`, `created`, `user_id`, `expiry`, `token_key`) VALUES
('2345cd940016305f7475b1c363a12ea452f0271b650f6c37673bb579eae062c013c0fe064dfd57055e34a3f7641ec82e70ac07c8044b9e96dd9f35fbc7ce58ce', '2022-08-18 04:59:23.188447', 43, '2022-08-18 14:59:23.187447', '320058ba'),
('28e2998ff1ae55bc3785e1c584be0b9cdb7dcf92cb83fcd41186b06cf3da2be0bf28e550e7ca48c8e1231b056a9d26b752decb17539ed15acdbbd56634b1b170', '2022-08-18 04:59:18.200448', 43, '2022-08-18 14:59:18.199947', '0144ddb7'),
('29316ea92bc39817416128d858ee36ddbce1e2556458b1aee167b103cd3c27730f8942a69afb2d7f23a114c19fdf3034d86c053dcef16028110a913114342604', '2022-08-18 04:59:36.216448', 43, '2022-08-18 14:59:36.215948', '3a0e1ce4'),
('2a0d9d6121433c26663cee79c02d5cdc485e39b6e1666048c0b579d248d7a4d8966ad9353cbea2653903e37174e38ec874ecc4ac7da4c6a70578041101b8ba18', '2022-08-19 16:06:24.171441', 70, '2022-08-20 02:06:24.170941', '3bc278b8'),
('36aed65aa14c34827cec2145fa603ffe73e4a8238b09e2aef08cf029d682dc3aa6584f3d1fbda4547ad6262bc633fad35f5a245e2c84abe0b9e96237bdd3e977', '2022-08-18 06:58:34.620447', 43, '2022-08-18 16:58:34.619447', '9ad1a5db'),
('53b000522a855f25f0b0ab1b948fc3d8743f2b925a569d8fdd9cc81629f6ad2603e1a993ff6345b0b42aeb47c4b6ac4c82abd3f8aac085058edf7f0d35936802', '2022-08-18 06:12:41.427947', 43, '2022-08-18 16:12:41.426947', '1fe35d15'),
('5a922d41f0ed0fd3bb8b058631a1e1b014ef328028e71521f04d1d98aad07e2fdc4409ef880db09957d9d78ed3154336b61341609fafd87b3b3bd3efed62a0a0', '2022-08-09 18:05:07.434967', 64, '2022-08-10 04:05:07.434466', '1e90a3e4'),
('5b3a993d01a3ffaeb91b0760e7363b5fb7eb808ee668e22b7ed7163da48efaa9375967ccc89cfa84be85b54a2fe601bdba3189d9c6712a2c3444265a25918c61', '2022-08-19 17:28:14.445281', 69, '2022-08-20 03:28:14.444782', '07f5645b'),
('702a260fe00d19ff6dbeaf07dae3def5327a40c63be77ce28606371a7979c0e5f9471396ae91b368132c51080d125f4d0b13000db736c914f75c6c48cd2bc85d', '2022-08-18 05:00:23.155446', 43, '2022-08-18 15:00:23.154447', '0124942e'),
('7bd00923d808bbff6541f56c8b2891bbc43ff9a429e9fe96599762c88ab402f98480b98026be5b1cd41f0ba497848cd7563de16f778a29985b5682dbb584f5ba', '2022-08-19 17:47:42.099783', 71, '2022-08-20 03:47:42.098781', '2b710ccf'),
('8a57f7207e8e9a302ab9b475dd03e8d8aab6b8a26ffee55a95b8083b6320549fd2b0a986d0bc558edd998614f43423918673ca72663fe22b5fe1da64a3dd7b03', '2022-08-11 00:53:24.508285', 68, '2022-08-11 10:53:24.507784', '0d550344'),
('8e8b85a29d3aea1c1b67904549cb218a185fc3975bb9aa02f7add6fdeb6e2d9b91419985822257d4c347d85e0153e8d7f80ea090506776dec3fba34e307bcc48', '2022-08-19 16:07:08.682441', 71, '2022-08-20 02:07:08.681942', 'ebdcc10f'),
('a596b4fdafc0a570e271449277d89a458f983827526c36e1c224f7db84c3879f7f0690b695b6dac7120e7debcb493b053b61aea9b9693556dcf208890459ecfa', '2022-08-18 04:58:34.674448', 43, '2022-08-18 14:58:34.673448', 'bfd96c9c'),
('adba0d4a1aed6465ef57c12815d595a073f1de91f78bd86a8e23e532dbea65d8d780715ce0c838a60bd0fc495ca2ea14a35514a0d4b72834bccef9b5a3222e37', '2022-08-19 16:06:28.305941', 70, '2022-08-20 02:06:28.305441', '66362a05'),
('b17adbd3a53710f9b93fc7cc0a00932af9f8a0fb339f0701276f1c5b3aa87b7f9c17ea67d7d37451237b21ca0d349e83b8d78eac1b09fb168c9078b6afce2d3c', '2022-08-19 16:05:12.964941', 69, '2022-08-20 02:05:12.964441', 'f9a1e5e4'),
('b3dd4da9bc5660b48af5f9c15ee4c076c83d99a79b05d188604c61d6bbc5b17bdd14b37adf1432a59d00cb4c58a6ed38f6d6f5e97f0fc0c35538f01d68d1d97c', '2022-08-18 04:59:06.326947', 43, '2022-08-18 14:59:06.325947', '4f3d99f5'),
('be01740c50c357ebfe65ff1a85f2964047001a54549cf4a0c2877f65c87c4b54ffa1edcbb219b0f26a10f5b27fc88ac53161d3738c4d450986095ead328cc772', '2022-08-09 18:01:50.989419', 63, '2022-08-10 04:01:50.988919', 'b1b0c7c1'),
('d770ca9e4510c4c7417a1e08db3dce4b6987d23d246e955f10d1287582681de4456ee6fba7350d076acebbe03ce3cded6b81e36c30a4d865211ac33065853f73', '2022-08-11 01:14:10.140515', 67, '2022-08-11 11:14:10.140015', 'cf282701'),
('e850e436bd3ffb2ffc180c5fabbc6024fbb3c0b7ce3f7f102796b7be136ddaacba5c0f89195cec2e5b47c40e70b52ae17b85ad3d9063c165def6f514ebd5b718', '2022-08-18 04:56:29.008948', 43, '2022-08-18 14:56:29.007948', 'c4d13865'),
('f55053494d5c5369f66b6aa49a10f5d08c404f49a0b2675e0402f4d936dec34f1f28dd92a30c6e258ed5bd63521b39b6daa415808653188d7eb9f6d5f1c85b38', '2022-08-18 05:00:00.116948', 43, '2022-08-18 15:00:00.115946', 'a19c6a70'),
('f5ef0b731f2d313a1c1aa2a8ba7af004bf911b8bf96722d73702fb543bc3ba19297bd1f5c95ba509f859338b4e2aff525e989ca9d14c4b81ef47d399e7dfe232', '2022-08-09 18:06:22.169587', 65, '2022-08-10 04:06:22.169587', 'efe84cdf'),
('fd228dbcd5bf58943c8702223c10571c77cc274268c2ea81da8c3fa1456a199c146db7eee8072b2a83f4ddb81570cc45ab70a1619cbf68d69e6e80931e598bc0', '2022-08-09 17:51:26.207868', 62, '2022-08-10 03:51:26.207368', '67dc7536'),
('fdcb849aea1d21f10d2e19693a403057fac77d0f19213983b9de6fd0556bcd796b2f1ccb35baf2e8aa309c015624a86c4f452d77d1ce9bf01e423bbc97975167', '2022-08-09 18:05:59.014221', 65, '2022-08-10 04:05:59.014221', '8e136228');

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `projects_project`
--

INSERT INTO `projects_project` (`id`, `name`, `category`, `img`, `admin_id`) VALUES
(8, 'PC master race', 'pc building', 'project/Captura_de_pantalla_2022-08-01_190843.jpg', 1),
(16, 'Projecto test 2', 'test 2', 'project/Captura_de_pantalla_2022-08-01_190843_VIJGkFi.jpg', 60),
(23, 'ProjectTest', 'TestCategory', 'project/projectdefault.jpg', 67),
(25, 'TestProject', 'TestCategory', 'project/Captura_de_pantalla_2022-08-01_190843_RXgC04p.jpg', 69);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `projects_projectmember`
--

INSERT INTO `projects_projectmember` (`id`, `is_manager`, `project_id`, `user_id`) VALUES
(8, 0, 8, 38),
(11, 1, 8, 39),
(18, 1, 8, 44),
(19, 0, 16, 1),
(20, 0, 16, 45),
(29, 1, 23, 62),
(30, 0, 23, 38),
(31, 0, 23, 39),
(32, 1, 23, 40),
(33, 1, 23, 58),
(34, 0, 23, 41),
(42, 0, 16, 21),
(43, 0, 25, 71),
(44, 1, 25, 70);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `users_profile`
--

INSERT INTO `users_profile` (`id`, `img`, `user_id`) VALUES
(3, 'user/Captura_de_pantalla_2022-08-01_190759.png', 1),
(11, 'userdefault.jpg', 21),
(28, 'userdefault.jpg', 38),
(29, 'userdefault.jpg', 39),
(30, 'userdefault.jpg', 40),
(31, 'userdefault.jpg', 41),
(33, 'userdefault.jpg', 43),
(34, 'userdefault.jpg', 44),
(35, 'userdefault.jpg', 45),
(44, 'user/benny-rotlevy-pv8ZwEBgW_g-unsplash.jpg', 54),
(48, 'userdefault.jpg', 58),
(49, 'user/Captura_de_pantalla_2022-08-01_190843.jpg', 59),
(50, 'user/Captura_de_pantalla_2022-07-27_183758.png', 60),
(52, 'userdefault.jpg', 62),
(53, 'userdefault.jpg', 63),
(54, 'userdefault.jpg', 64),
(55, 'userdefault.jpg', 65),
(57, 'user/userdefault.jpg', 67),
(58, 'userdefault.jpg', 68),
(59, 'userdefault.jpg', 69),
(60, 'userdefault.jpg', 70),
(61, 'userdefault.jpg', 71);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indices de la tabla `expenses_expense`
--
ALTER TABLE `expenses_expense`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_expense_user_id_ab1aae2b_fk_auth_user_id` (`user_id`),
  ADD KEY `expenses_expense_project_id_055a15c4_fk_projects_project_id` (`project_id`);

--
-- Indices de la tabla `incomes_income`
--
ALTER TABLE `incomes_income`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incomes_income_project_id_871457c9_fk_projects_project_id` (`project_id`);

--
-- Indices de la tabla `knox_authtoken`
--
ALTER TABLE `knox_authtoken`
  ADD PRIMARY KEY (`digest`),
  ADD KEY `knox_authtoken_user_id_e5a5d899_fk_auth_user_id` (`user_id`),
  ADD KEY `knox_authtoken_token_key_8f4f7d47` (`token_key`);

--
-- Indices de la tabla `projects_project`
--
ALTER TABLE `projects_project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_project_admin_id_978c4bac_fk_auth_user_id` (`admin_id`);

--
-- Indices de la tabla `projects_projectmember`
--
ALTER TABLE `projects_projectmember`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_projectmemb_project_id_e589ddea_fk_projects_` (`project_id`),
  ADD KEY `projects_projectmember_user_id_a475bbd8_fk_auth_user_id` (`user_id`);

--
-- Indices de la tabla `users_profile`
--
ALTER TABLE `users_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `expenses_expense`
--
ALTER TABLE `expenses_expense`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT de la tabla `incomes_income`
--
ALTER TABLE `incomes_income`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `projects_project`
--
ALTER TABLE `projects_project`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `projects_projectmember`
--
ALTER TABLE `projects_projectmember`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `users_profile`
--
ALTER TABLE `users_profile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `expenses_expense`
--
ALTER TABLE `expenses_expense`
  ADD CONSTRAINT `expenses_expense_project_id_055a15c4_fk_projects_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects_project` (`id`),
  ADD CONSTRAINT `expenses_expense_user_id_ab1aae2b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `incomes_income`
--
ALTER TABLE `incomes_income`
  ADD CONSTRAINT `incomes_income_project_id_871457c9_fk_projects_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects_project` (`id`);

--
-- Filtros para la tabla `knox_authtoken`
--
ALTER TABLE `knox_authtoken`
  ADD CONSTRAINT `knox_authtoken_user_id_e5a5d899_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `projects_project`
--
ALTER TABLE `projects_project`
  ADD CONSTRAINT `projects_project_admin_id_978c4bac_fk_auth_user_id` FOREIGN KEY (`admin_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `projects_projectmember`
--
ALTER TABLE `projects_projectmember`
  ADD CONSTRAINT `projects_projectmemb_project_id_e589ddea_fk_projects_` FOREIGN KEY (`project_id`) REFERENCES `projects_project` (`id`),
  ADD CONSTRAINT `projects_projectmember_user_id_a475bbd8_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `users_profile`
--
ALTER TABLE `users_profile`
  ADD CONSTRAINT `users_profile_user_id_2112e78d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
