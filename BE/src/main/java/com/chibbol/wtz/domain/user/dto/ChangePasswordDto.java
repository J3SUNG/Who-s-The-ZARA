package com.chibbol.wtz.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChangePasswordDto {
    private String password;
    private String newPassword;
}
